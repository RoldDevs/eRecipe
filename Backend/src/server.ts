/**
 * Express server with Drizzle ORM
 * This backend works alongside FastAPI
 */

import express from 'express';
import cors from 'cors';
import { getDb } from './db';
import recipeRoutes from './routes/recipes';
import userRoutes from './routes/users';
import restaurantRoutes from './routes/restaurants';
import postRoutes from './routes/posts';
import orderRoutes from './routes/orders';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
	origin: ['http://localhost:5173', 'http://localhost:4321', 'http://localhost:8000'],
	credentials: true
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
	res.json({ status: 'healthy', service: 'drizzle-api' });
});

// Initialize database
app.use((req, res, next) => {
	req.db = getDb();
	next();
});

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/orders', orderRoutes);

// Start server
app.listen(PORT, () => {
	console.log(`🚀 Drizzle API server running on http://localhost:${PORT}`);
	console.log(`📊 Database: ${process.env.DATABASE_URL || './local.db'}`);
});

// Extend Express Request type
declare global {
	namespace Express {
		interface Request {
			db: ReturnType<typeof getDb>;
		}
	}
}

