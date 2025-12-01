import { Router } from 'express';
import { recipes, users } from '../db/schema';
import { eq } from 'drizzle-orm';

const router = Router();

// Get all recipes
router.get('/', async (req, res) => {
	try {
		const allRecipes = await req.db.select().from(recipes);
		res.json(allRecipes);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch recipes' });
	}
});

// Get recipe by ID
router.get('/:id', async (req, res) => {
	try {
		const recipe = await req.db
			.select()
			.from(recipes)
			.where(eq(recipes.id, parseInt(req.params.id)))
			.limit(1);

		if (recipe.length === 0) {
			return res.status(404).json({ error: 'Recipe not found' });
		}

		res.json(recipe[0]);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch recipe' });
	}
});

// Create recipe
router.post('/', async (req, res) => {
	try {
		const newRecipe = await req.db.insert(recipes).values(req.body).returning();
		res.status(201).json(newRecipe[0]);
	} catch (error) {
		res.status(500).json({ error: 'Failed to create recipe' });
	}
});

// Update recipe
router.put('/:id', async (req, res) => {
	try {
		const updated = await req.db
			.update(recipes)
			.set(req.body)
			.where(eq(recipes.id, parseInt(req.params.id)))
			.returning();

		if (updated.length === 0) {
			return res.status(404).json({ error: 'Recipe not found' });
		}

		res.json(updated[0]);
	} catch (error) {
		res.status(500).json({ error: 'Failed to update recipe' });
	}
});

// Delete recipe
router.delete('/:id', async (req, res) => {
	try {
		const deleted = await req.db
			.delete(recipes)
			.where(eq(recipes.id, parseInt(req.params.id)))
			.returning();

		if (deleted.length === 0) {
			return res.status(404).json({ error: 'Recipe not found' });
		}

		res.json({ message: 'Recipe deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Failed to delete recipe' });
	}
});

export default router;

