// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

/// <reference types="vite/client" />
/// <reference types="@sveltejs/kit" />

// Declare SvelteKit $app aliases for TypeScript
declare module '$app/navigation' {
	export function goto(
		href: string,
		opts?: { replaceState?: boolean; noScroll?: boolean; keepFocus?: boolean; invalidateAll?: boolean }
	): Promise<void>;
	export function invalidate(url: string): Promise<void>;
	export function invalidateAll(): Promise<void>;
	export function preloadData(href: string): Promise<{ type: 'loaded' | 'error'; status?: number; error?: Error }>;
	export function preloadCode(href: string): Promise<{ type: 'loaded' | 'error'; error?: Error }>;
	export const beforeNavigate: import('svelte/store').Readable<((navigation: import('@sveltejs/kit').BeforeNavigate) => void) | null>;
	export const afterNavigate: import('svelte/store').Readable<((navigation: import('@sveltejs/kit').AfterNavigate) => void) | null>;
}

declare module '$app/stores' {
	import { Readable } from 'svelte/store';
	import { Page } from '@sveltejs/kit';
	export const page: Readable<Page>;
	export const navigating: Readable<import('@sveltejs/kit').Navigation | null>;
	export const updated: Readable<boolean> & { check(): Promise<boolean> };
}

interface ImportMetaEnv {
	readonly VITE_API_URL?: string;
	readonly VITE_DRIZZLE_API_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

export {};

