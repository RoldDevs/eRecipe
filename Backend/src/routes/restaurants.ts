import { Router } from 'express';
import { restaurants } from '../db/schema';
import { eq } from 'drizzle-orm';

const router = Router();

// Get all restaurants
router.get('/', async (req, res) => {
	try {
		const allRestaurants = await req.db.select().from(restaurants);
		res.json(allRestaurants);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch restaurants' });
	}
});

// Get restaurant by ID
router.get('/:id', async (req, res) => {
	try {
		const restaurant = await req.db
			.select()
			.from(restaurants)
			.where(eq(restaurants.id, parseInt(req.params.id)))
			.limit(1);

		if (restaurant.length === 0) {
			return res.status(404).json({ error: 'Restaurant not found' });
		}

		res.json(restaurant[0]);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch restaurant' });
	}
});

export default router;

