/**
 * Authentication store
 * Manages user authentication state
 * Following KISS and DRY principles
 */

import { writable } from 'svelte/store';

export interface User {
	id: number;
	email: string;
	username: string;
	fullName: string | null;
	avatar: string | null;
	bio: string | null;
}

interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
}

const STORAGE_KEY_TOKEN = 'auth_token';
const STORAGE_KEY_USER = 'auth_user';

const createAuthStore = () => {
	const { subscribe, set } = writable<AuthState>({
		user: null,
		token: null,
		isAuthenticated: false
	});

	// Load from localStorage on initialization (only in browser)
	if (typeof window !== 'undefined') {
		const storedToken = localStorage.getItem(STORAGE_KEY_TOKEN);
		const storedUser = localStorage.getItem(STORAGE_KEY_USER);
		
		if (storedToken && storedUser) {
			try {
				const user = JSON.parse(storedUser);
				set({
					user,
					token: storedToken,
					isAuthenticated: true
				});
			} catch {
				// Invalid stored data, clear it
				localStorage.removeItem(STORAGE_KEY_TOKEN);
				localStorage.removeItem(STORAGE_KEY_USER);
			}
		}
	}

	return {
		subscribe,
		login: (user: User, token: string) => {
			if (typeof window !== 'undefined') {
				localStorage.setItem(STORAGE_KEY_TOKEN, token);
				localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
			}
			set({
				user,
				token,
				isAuthenticated: true
			});
		},
		logout: () => {
			if (typeof window !== 'undefined') {
				localStorage.removeItem(STORAGE_KEY_TOKEN);
				localStorage.removeItem(STORAGE_KEY_USER);
			}
			set({
				user: null,
				token: null,
				isAuthenticated: false
			});
		}
	};
};

export const authStore = createAuthStore();

