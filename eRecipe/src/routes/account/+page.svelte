<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { createParallaxEffect } from '$lib/utils/animations';
	import { authStore } from '$lib/stores/auth';
	import { getCurrentUser } from '$lib/api';

	let backgroundElement: HTMLElement;
	let parallaxCleanup: (() => void) | null = null;
	let isLoading = true;

	onMount(() => {
		if (backgroundElement) {
			parallaxCleanup = createParallaxEffect(backgroundElement, 0.3);
		}

		// Redirect if not authenticated
		if (!$authStore.isAuthenticated) {
			goto('/signin');
			return;
		}

		// Load user data
		loadUserData();

		return () => {
			if (parallaxCleanup) parallaxCleanup();
		};
	});

	async function loadUserData() {
		if (!$authStore.token) {
			goto('/signin');
			return;
		}

		try {
			const user = await getCurrentUser($authStore.token);
			authStore.login(user, $authStore.token);
		} catch (error) {
			// Token invalid, logout
			authStore.logout();
			goto('/signin');
		} finally {
			isLoading = false;
		}
	}

	function handleLogout() {
		authStore.logout();
		goto('/');
	}
</script>

<svelte:head>
	<title>Account - eRecipe</title>
	<meta name="description" content="Your eRecipe account information" />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<Header />

	<main class="flex-grow flex items-center justify-center py-20 px-4 relative overflow-hidden">
		<!-- Background with parallax -->
		<div
			bind:this={backgroundElement}
			class="parallax-element fixed inset-0 bg-gradient-to-br from-primary-pale via-primary-cream to-white opacity-50 -z-10"
		></div>

		{#if isLoading}
			<div class="relative z-10 text-center">
				<p class="text-lg text-gray-600">Loading...</p>
			</div>
		{:else if $authStore.user}
			<div class="relative z-10 w-full max-w-2xl mx-auto">
				<div class="bg-white rounded-2xl shadow-xl p-8 md:p-12">
					<div class="text-center mb-8">
						<div class="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
							<span class="text-4xl text-white font-display">
								{$authStore.user.fullName ? $authStore.user.fullName.charAt(0).toUpperCase() : $authStore.user.email.charAt(0).toUpperCase()}
							</span>
						</div>
						<h1 class="text-3xl font-display font-bold text-gray-800 mb-2">
							{$authStore.user.fullName || 'User'}
						</h1>
						<p class="text-gray-600">{$authStore.user.email}</p>
					</div>

					<div class="space-y-4 mb-8">
						<div class="border-b border-gray-200 pb-4">
							<div class="block text-sm font-medium text-gray-500 mb-1">Username</div>
							<p class="text-lg text-gray-800">{$authStore.user.username}</p>
						</div>

						{#if $authStore.user.bio}
							<div class="border-b border-gray-200 pb-4">
								<div class="block text-sm font-medium text-gray-500 mb-1">Bio</div>
								<p class="text-lg text-gray-800">{$authStore.user.bio}</p>
							</div>
						{/if}
					</div>

					<div class="flex flex-col sm:flex-row gap-4">
						<button
							on:click={handleLogout}
							class="w-full bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
						>
							Sign Out
						</button>
					</div>
				</div>
			</div>
		{/if}
	</main>

	<Footer />
</div>

