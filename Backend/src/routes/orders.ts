import { Router } from 'express';
import { orders } from '../db/schema';
import { eq } from 'drizzle-orm';

const router = Router();

// Get all orders
router.get('/', async (req, res) => {
	try {
		const allOrders = await req.db.select().from(orders);
		res.json(allOrders);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch orders' });
	}
});

export default router;

