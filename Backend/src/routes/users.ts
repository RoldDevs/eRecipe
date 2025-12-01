import { Router } from 'express';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

const router = Router();

// Get all users
router.get('/', async (req, res) => {
	try {
		const allUsers = await req.db.select().from(users);
		res.json(allUsers);
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

		res.json(user[0]);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch user' });
	}
});

export default router;

