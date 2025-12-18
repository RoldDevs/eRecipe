import { Router } from 'express';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { hashPassword, verifyPassword, generateToken, verifyToken } from '../utils/auth';

const router = Router();

// Sign up - Create new user
router.post('/signup', async (req, res) => {
	try {
		const { email, password, fullName } = req.body;

		if (!email || !password) {
			return res.status(400).json({ error: 'Email and password are required' });
		}

		// Check if user already exists
		const existingUser = await req.db
			.select()
			.from(users)
			.where(eq(users.email, email))
			.limit(1);

		if (existingUser.length > 0) {
			return res.status(400).json({ error: 'User with this email already exists' });
		}

		// Generate username from email (simple approach)
		// Ensure uniqueness by checking and appending random number if needed
		let username = email.split('@')[0];
		let usernameExists = true;
		let attempts = 0;
		
		while (usernameExists && attempts < 10) {
			const checkUser = await req.db
				.select()
				.from(users)
				.where(eq(users.username, username))
				.limit(1);
			
			if (checkUser.length === 0) {
				usernameExists = false;
			} else {
				username = email.split('@')[0] + Math.floor(Math.random() * 10000);
				attempts++;
			}
		}

		// Hash password
		const passwordHash = hashPassword(password);

		// Create user
		const newUser = await req.db
			.insert(users)
			.values({
				email,
				username,
				passwordHash,
				fullName: fullName || null
			})
			.returning();

		// Generate token
		const token = generateToken(newUser[0].id, newUser[0].email);

		// Return user data (without password hash) and token
		const { passwordHash: _, ...userData } = newUser[0];
		res.status(201).json({
			user: userData,
			token
		});
	} catch (error) {
		console.error('Signup error:', error);
		res.status(500).json({ error: 'Failed to create user' });
	}
});

// Sign in - Authenticate user
router.post('/signin', async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ error: 'Email and password are required' });
		}

		// Find user by email
		const user = await req.db
			.select()
			.from(users)
			.where(eq(users.email, email))
			.limit(1);

		if (user.length === 0) {
			return res.status(401).json({ error: 'Invalid email or password' });
		}

		// Verify password
		if (!verifyPassword(password, user[0].passwordHash)) {
			return res.status(401).json({ error: 'Invalid email or password' });
		}

		// Generate token
		const token = generateToken(user[0].id, user[0].email);

		// Return user data (without password hash) and token
		const { passwordHash: _, ...userData } = user[0];
		res.json({
			user: userData,
			token
		});
	} catch (error) {
		console.error('Signin error:', error);
		res.status(500).json({ error: 'Failed to authenticate user' });
	}
});

// Get current user (requires authentication)
router.get('/me', async (req, res) => {
	try {
		const token = req.headers.authorization?.replace('Bearer ', '');
		
		if (!token) {
			return res.status(401).json({ error: 'Authentication required' });
		}

		const decoded = verifyToken(token);

		if (!decoded) {
			return res.status(401).json({ error: 'Invalid token' });
		}

		const user = await req.db
			.select()
			.from(users)
			.where(eq(users.id, decoded.userId))
			.limit(1);

		if (user.length === 0) {
			return res.status(404).json({ error: 'User not found' });
		}

		const { passwordHash: _, ...userData } = user[0];
		res.json(userData);
	} catch (error) {
		console.error('Get user error:', error);
		res.status(500).json({ error: 'Failed to fetch user' });
	}
});

// Forgot password - Request password reset
router.post('/forgot-password', async (req, res) => {
	try {
		const { email } = req.body;

		if (!email) {
			return res.status(400).json({ error: 'Email is required' });
		}

		// Find user by email
		const user = await req.db
			.select()
			.from(users)
			.where(eq(users.email, email))
			.limit(1);

		// Always return success for security (don't reveal if email exists)
		// In production, you would:
		// 1. Generate a reset token
		// 2. Store it in the database with an expiry
		// 3. Send email with reset link using Nodemailer or a service like SendGrid/Mailgun

		if (user.length > 0) {
			// Log for development - in production, send actual email
			console.log(`[Password Reset] Reset requested for: ${email}`);
			console.log(`[Password Reset] User found: ${user[0].username}`);
			// TODO: Implement actual email sending with Nodemailer
			// Example: await sendPasswordResetEmail(email, resetToken);
		}

		res.json({ 
			message: 'If an account exists with this email, you will receive password reset instructions.' 
		});
	} catch (error) {
		console.error('Forgot password error:', error);
		// Still return success for security
		res.json({ 
			message: 'If an account exists with this email, you will receive password reset instructions.' 
		});
	}
});

// Get all users
router.get('/', async (req, res) => {
	try {
		const allUsers = await req.db.select().from(users);
		// Remove password hashes from response
		const sanitizedUsers = allUsers.map(({ passwordHash: _, ...user }) => user);
		res.json(sanitizedUsers);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch users' });
	}
});

// Get user by ID
router.get('/:id', async (req, res) => {
	try {
		const user = await req.db
			.select()
			.from(users)
			.where(eq(users.id, parseInt(req.params.id)))
			.limit(1);

		if (user.length === 0) {
			return res.status(404).json({ error: 'User not found' });
		}

		const { passwordHash: _, ...userData } = user[0];
		res.json(userData);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch user' });
	}
});

export default router;

