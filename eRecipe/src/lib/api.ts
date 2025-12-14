// API configuration
// @ts-ignore - Vite environment variables
const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:8000';
// @ts-ignore - Vite environment variables
const DRIZZLE_API_URL = import.meta.env?.VITE_DRIZZLE_API_URL || 'http://localhost:3000';

// Use Drizzle API directly (faster) or FastAPI proxy
const USE_DRIZZLE_DIRECT = true;
const BASE_URL = USE_DRIZZLE_DIRECT ? DRIZZLE_API_URL : API_BASE_URL;

async function fetchAPI(endpoint: string, options?: RequestInit) {
	const url = `${BASE_URL}${endpoint}`;
	
	try {
		const response = await fetch(url, {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...options?.headers,
			},
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({ error: response.statusText }));
			const error = new Error(errorData.error || `API error: ${response.statusText}`);
			throw error;
		}

		return response.json();
	} catch (error: any) {
		// Handle network errors (server not running, CORS, etc.)
		const isNetworkError = 
			error.name === 'TypeError' || 
			error.message?.includes('fetch') || 
			error.message?.includes('Failed to fetch') ||
			error.message?.includes('NetworkError') ||
			error.message?.includes('Network request failed');
			
		if (isNetworkError) {
			const errorMessage = error.message || 'Network error';
			console.error(`[API Error] Failed to fetch ${url}:`, errorMessage);
			throw new Error(
				`Cannot connect to backend server at ${BASE_URL}${endpoint}. Error: ${errorMessage}. Please make sure the Drizzle API server is running on port 3000.`
			);
		}
		// Re-throw other errors
		throw error;
	}
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

// Authentication
export async function signup(data: { email: string; password: string; fullName?: string }) {
	return fetchAPI('/api/users/signup', {
		method: 'POST',
		body: JSON.stringify(data)
	});
}

export async function signin(data: { email: string; password: string }) {
	return fetchAPI('/api/users/signin', {
		method: 'POST',
		body: JSON.stringify(data)
	});
}

export async function getCurrentUser(token: string) {
	return fetchAPI('/api/users/me', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
}