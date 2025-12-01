import { Router } from 'express';
import { posts } from '../db/schema';
import { eq } from 'drizzle-orm';

const router = Router();

// Get all posts
router.get('/', async (req, res) => {
	try {
		const allPosts = await req.db.select().from(posts);
		res.json(allPosts);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch posts' });
	}
});

export default router;

