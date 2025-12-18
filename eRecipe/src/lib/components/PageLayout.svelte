<script lang="ts">
	import { onMount } from 'svelte';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { createParallaxEffect } from '$lib/utils/animations';

	export let title: string;
	export let description: string = '';
	export let showParallax: boolean = true;
	export let parallaxSpeed: number = 0.3;
	export let contentClass: string = '';

	let backgroundElement: HTMLElement;
	let parallaxCleanup: (() => void) | null = null;

	onMount(() => {
		if (showParallax && backgroundElement) {
			parallaxCleanup = createParallaxEffect(backgroundElement, parallaxSpeed);
		}

		return () => {
			if (parallaxCleanup) parallaxCleanup();
		};
	});
</script>

<svelte:head>
	<title>{title} - eRecipe</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
</svelte:head>

<div class="min-h-screen flex flex-col bg-gradient-to-br from-primary-pale via-primary-cream to-white">
	<Header />

	<main class="flex-grow py-20 px-4 relative overflow-hidden {contentClass}">
		{#if showParallax}
			<!-- Background with parallax -->
			<div
				bind:this={backgroundElement}
				class="parallax-element fixed inset-0 bg-gradient-to-br from-primary-pale via-primary-cream to-white opacity-50 -z-10"
			></div>
		{/if}

		<slot />
	</main>

	<Footer />
</div>

