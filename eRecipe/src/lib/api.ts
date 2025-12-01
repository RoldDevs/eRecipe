// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const DRIZZLE_API_URL = import.meta.env.VITE_DRIZZLE_API_URL || 'http://localhost:3000';

// Use Drizzle API directly (faster) or FastAPI proxy
const USE_DRIZZLE_DIRECT = true;
const BASE_URL = USE_DRIZZLE_DIRECT ? DRIZZLE_API_URL : API_BASE_URL;

async function fetchAPI(endpoint: string, options?: RequestInit) {
	const response = await fetch(`${BASE_URL}${endpoint}`, {
		...options,
		headers: {
			'Content-Type': 'application/json',
			...options?.headers,
		},
	});

	if (!response.ok) {
		throw new Error(`API error: ${response.statusText}`);
	}

	return response.json();
}

// Health check
export async function getHealth() {
	return fetchAPI('/health');
}

// Root endpoint
export async function getRoot() {
	return fetchAPI('/');
}

// Recipes
export async function getRecipes() {
	return fetchAPI('/api/recipes');
}

export async function getRecipe(id: number) {
	return fetchAPI(`/api/recipes/${id}`);
}

export async function createRecipe(recipe: any) {
	return fetchAPI('/api/recipes', {
		method: 'POST',
		body: JSON.stringify(recipe),
	});
}

// Restaurants
export async function getRestaurants() {
	return fetchAPI('/api/restaurants');
}

export async function getRestaurant(id: number) {
	return fetchAPI(`/api/restaurants/${id}`);
}

// Users
export async function getUsers() {
	return fetchAPI('/api/users');
}

export async function getUser(id: number) {
	return fetchAPI(`/api/users/${id}`);
}

// Posts
export async function getPosts() {
	return fetchAPI('/api/posts');
}

// Orders
export async function getOrders() {
	return fetchAPI('/api/orders');
}
