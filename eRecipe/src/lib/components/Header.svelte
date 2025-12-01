<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { scrollToElement } from '$lib/utils';

	let scrolled = false;
	let mobileMenuOpen = false;

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 50;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function handleNavClick(anchor: string) {
		mobileMenuOpen = false;
		scrollToElement(anchor, 80);
	}
</script>

<header
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled
		? 'bg-white shadow-md py-3'
		: 'bg-transparent py-5'}"
>
	<nav class="container mx-auto px-4">
		<div class="flex items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center space-x-2 group">
				<span class="text-3xl font-display font-bold text-primary transition-colors group-hover:text-primary-light">
					eRecipe
				</span>
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center space-x-8">
				<a
					href="#recipes"
					on:click|preventDefault={() => handleNavClick('recipes')}
					class="text-gray-700 hover:text-primary transition-colors font-medium"
				>
					Recipes
				</a>
				<a
					href="#restaurants"
					on:click|preventDefault={() => handleNavClick('restaurants')}
					class="text-gray-700 hover:text-primary transition-colors font-medium"
				>
					Restaurants
				</a>
				<a
					href="#community"
					on:click|preventDefault={() => handleNavClick('community')}
					class="text-gray-700 hover:text-primary transition-colors font-medium"
				>
					Community
				</a>
				<a
					href="#about"
					on:click|preventDefault={() => handleNavClick('about')}
					class="text-gray-700 hover:text-primary transition-colors font-medium"
				>
					About
				</a>
				<button
					class="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-light transition-all duration-300 transform hover:scale-105 font-medium"
				>
					Sign In
				</button>
			</div>

			<!-- Mobile Menu Button -->
			<button
				on:click={toggleMobileMenu}
				class="md:hidden p-2 text-gray-700 hover:text-primary transition-colors"
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
				class="md:hidden mt-4 pb-4 space-y-4 animate-slide-down"
				transition:slide={{ duration: 300 }}
			>
				<a
					href="#recipes"
					on:click|preventDefault={() => handleNavClick('recipes')}
					class="block text-gray-700 hover:text-primary transition-colors font-medium py-2">
					Recipes
				</a>
				<a
					href="#restaurants"
					on:click|preventDefault={() => handleNavClick('restaurants')}
					class="block text-gray-700 hover:text-primary transition-colors font-medium py-2">
					Restaurants
				</a>
				<a
					href="#community"
					on:click|preventDefault={() => handleNavClick('community')}
					class="block text-gray-700 hover:text-primary transition-colors font-medium py-2"
				>
					Community
				</a>
				<a
					href="#about"
					on:click|preventDefault={() => handleNavClick('about')}
					class="block text-gray-700 hover:text-primary transition-colors font-medium py-2"
				>
					About
				</a>
				<button
					class="w-full bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-light transition-all duration-300 font-medium"
				>
					Sign In
				</button>
			</div>
		{/if}
	</nav>
</header>

