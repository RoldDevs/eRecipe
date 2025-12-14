<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { scrollToElement } from '$lib/utils';
	import { authStore } from '$lib/stores/auth';

	let scrolled = false;
	let mobileMenuOpen = false;

	// Check if current page is an auth page or error page
	$: isAuthPage = $page.url.pathname === '/signin' || $page.url.pathname === '/signup';
	$: isErrorPage = $page.status === 404 || $page.status >= 500;
	$: isHomePage = $page.url.pathname === '/';
	// Use dark text if scrolled OR on auth/error pages
	$: useDarkText = scrolled || isAuthPage || isErrorPage;

	onMount(() => {
		// On auth/error pages, start with scrolled state to show white background
		if (isAuthPage || isErrorPage) {
			scrolled = true;
		}

		const handleScroll = () => {
			scrolled = window.scrollY > 50;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	async function handleNavClick(anchor: string) {
		mobileMenuOpen = false;
		
		// If not on home page, navigate to home with anchor
		if (!isHomePage) {
			await goto(`/#${anchor}`);
			// Wait for navigation and DOM update, then scroll
			setTimeout(() => {
				scrollToElement(anchor, 80);
			}, 100);
		} else {
			// On home page, just scroll to element
			scrollToElement(anchor, 80);
		}
	}
</script>

<header
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {useDarkText
		? 'bg-white shadow-md py-3'
		: 'bg-transparent py-5'}"
>
	<nav class="container mx-auto px-4">
		<div class="flex items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center space-x-2 group">
				<span class="text-3xl font-display font-bold {useDarkText ? 'text-primary' : 'text-white'} transition-colors group-hover:text-primary-light">
					eRecipe
				</span>
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center space-x-8">
				<a
					href="#recipes"
					on:click|preventDefault={() => handleNavClick('recipes')}
					class="{useDarkText ? 'text-gray-800' : 'text-white'} hover:text-primary transition-colors font-medium drop-shadow-sm"
				>
					Recipes
				</a>
				<a
					href="#restaurants"
					on:click|preventDefault={() => handleNavClick('restaurants')}
					class="{useDarkText ? 'text-gray-800' : 'text-white'} hover:text-primary transition-colors font-medium drop-shadow-sm"
				>
					Restaurants
				</a>
				<a
					href="#community"
					on:click|preventDefault={() => handleNavClick('community')}
					class="{useDarkText ? 'text-gray-800' : 'text-white'} hover:text-primary transition-colors font-medium drop-shadow-sm"
				>
					Community
				</a>
				<a
					href="#about"
					on:click|preventDefault={() => handleNavClick('about')}
					class="{useDarkText ? 'text-gray-800' : 'text-white'} hover:text-primary transition-colors font-medium drop-shadow-sm"
				>
					About
				</a>
				{#if !isAuthPage}
					{#if $authStore.isAuthenticated}
						<a
							href="/account"
							class="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-light transition-all duration-300 transform hover:scale-105 font-medium shadow-lg"
						>
							Account
						</a>
					{:else}
						<a
							href="/signin"
							class="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-light transition-all duration-300 transform hover:scale-105 font-medium shadow-lg"
						>
							Sign In
						</a>
					{/if}
				{/if}
			</div>

			<!-- Mobile Menu Button -->
			<button
				on:click={toggleMobileMenu}
				class="md:hidden p-2 {useDarkText ? 'text-gray-800' : 'text-white'} hover:text-primary transition-colors"
				aria-label="Toggle menu"
			>
				<svg
					class="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					{#if mobileMenuOpen}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					{:else}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					{/if}
				</svg>
			</button>
		</div>

		<!-- Mobile Menu -->
		{#if mobileMenuOpen}
			<div
				class="md:hidden mt-4 pb-4 space-y-4 animate-slide-down {scrolled ? 'bg-white' : 'bg-white/95 backdrop-blur-sm rounded-lg'} p-4"
				transition:slide={{ duration: 300 }}
			>
				<a
					href="#recipes"
					on:click|preventDefault={() => handleNavClick('recipes')}
					class="block text-gray-800 hover:text-primary transition-colors font-medium py-2">
					Recipes
				</a>
				<a
					href="#restaurants"
					on:click|preventDefault={() => handleNavClick('restaurants')}
					class="block text-gray-800 hover:text-primary transition-colors font-medium py-2">
					Restaurants
				</a>
				<a
					href="#community"
					on:click|preventDefault={() => handleNavClick('community')}
					class="block text-gray-800 hover:text-primary transition-colors font-medium py-2"
				>
					Community
				</a>
				<a
					href="#about"
					on:click|preventDefault={() => handleNavClick('about')}
					class="block text-gray-800 hover:text-primary transition-colors font-medium py-2"
				>
					About
				</a>
				{#if !isAuthPage}
					{#if $authStore.isAuthenticated}
						<a
							href="/account"
							class="w-full bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-light transition-all duration-300 font-medium shadow-lg text-center block"
						>
							Account
						</a>
					{:else}
						<a
							href="/signin"
							class="w-full bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-light transition-all duration-300 font-medium shadow-lg text-center block"
						>
							Sign In
						</a>
					{/if}
				{/if}
			</div>
		{/if}
	</nav>
</header>

