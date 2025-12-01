/**
 * Database schema definitions
 * Following clean code principles - single source of truth
 */

import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// For PostgreSQL, use:
// import { pgTable, text, integer, real, timestamp } from 'drizzle-orm/pg-core';

export const users = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	email: text('email').notNull().unique(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	fullName: text('full_name'),
	avatar: text('avatar'),
	bio: text('bio'),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`)
});

export const recipes = sqliteTable('recipes', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	title: text('title').notNull(),
	description: text('description'),
	instructions: text('instructions').notNull(),
	imageUrl: text('image_url'),
	prepTime: integer('prep_time'), // in minutes
	cookTime: integer('cook_time'), // in minutes
	servings: integer('servings'),
	difficulty: text('difficulty'), // 'easy', 'medium', 'hard'
	authorId: integer('author_id').references(() => users.id),
	price: real('price'),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`)
});

export const ingredients = sqliteTable('ingredients', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull().unique(),
	category: text('category') // 'vegetable', 'meat', 'spice', etc.
});

export const recipeIngredients = sqliteTable('recipe_ingredients', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	recipeId: integer('recipe_id').references(() => recipes.id).notNull(),
	ingredientId: integer('ingredient_id').references(() => ingredients.id).notNull(),
	quantity: text('quantity'), // e.g., "2 cups", "1 tsp"
	unit: text('unit')
});

export const restaurants = sqliteTable('restaurants', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	description: text('description'),
	address: text('address'),
	phone: text('phone'),
	email: text('email'),
	imageUrl: text('image_url'),
	rating: real('rating'),
	ownerId: integer('owner_id').references(() => users.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`)
});

export const posts = sqliteTable('posts', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	content: text('content').notNull(),
	imageUrl: text('image_url'),
	authorId: integer('author_id').references(() => users.id).notNull(),
	recipeId: integer('recipe_id').references(() => recipes.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`)
});

export const likes = sqliteTable('likes', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	userId: integer('user_id').references(() => users.id).notNull(),
	postId: integer('post_id').references(() => posts.id),
	recipeId: integer('recipe_id').references(() => recipes.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`)
});

export const comments = sqliteTable('comments', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	content: text('content').notNull(),
	authorId: integer('author_id').references(() => users.id).notNull(),
	postId: integer('post_id').references(() => posts.id),
	recipeId: integer('recipe_id').references(() => recipes.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`)
});

export const orders = sqliteTable('orders', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	userId: integer('user_id').references(() => users.id).notNull(),
	restaurantId: integer('restaurant_id').references(() => restaurants.id),
	total: real('total').notNull(),
	status: text('status').notNull(), // 'pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`)
});

export const orderItems = sqliteTable('order_items', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	orderId: integer('order_id').references(() => orders.id).notNull(),
	recipeId: integer('recipe_id').references(() => recipes.id).notNull(),
	quantity: integer('quantity').notNull(),
	price: real('price').notNull()
});

