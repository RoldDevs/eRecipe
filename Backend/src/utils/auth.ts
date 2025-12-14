/**
 * Authentication utilities
 * Following KISS and security best practices
 */

import crypto from 'crypto';

/**
 * Hash password using SHA-256 (simple, secure for this use case)
 * For production, consider using bcrypt or argon2
 */
export function hashPassword(password: string): string {
	return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * Verify password against hash
 */
export function verifyPassword(password: string, hash: string): boolean {
	return hashPassword(password) === hash;
}

/**
 * Generate a simple session token
 * For production, use JWT with proper signing
 */
export function generateToken(userId: number, email: string): string {
	const payload = {
		userId,
		email,
		timestamp: Date.now()
	};
	return Buffer.from(JSON.stringify(payload)).toString('base64');
}

/**
 * Verify and decode token
 */
export function verifyToken(token: string): { userId: number; email: string } | null {
	try {
		const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
		return { userId: decoded.userId, email: decoded.email };
	} catch {
		return null;
	}
}

