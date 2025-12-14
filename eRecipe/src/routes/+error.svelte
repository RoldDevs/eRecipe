<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { createParallaxEffect } from '$lib/utils/animations';

	export let error: Error | undefined = undefined;

	let backgroundElement: HTMLElement;
	let parallaxCleanup: (() => void) | null = null;

	$: status = $page.status || 500;
	$: is404 = status === 404;
	$: errorTitle = is404 ? '404' : 'Error';
	$: errorMessage = is404
		? "Page Not Found"
		: error?.message || 'Something went wrong';

	onMount(() => {
		if (backgroundElement) {
			parallaxCleanup = createParallaxEffect(backgroundElement, 0.3);
		}

		return () => {
			if (parallaxCleanup) parallaxCleanup();
		};
	});

	function goHome() {
		goto('/');
	}
</script>

<svelte:head>
	<title>{errorTitle} - eRecipe</title>
	<meta name="description" content={errorMessage} />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<Header />

	<main class="flex-grow flex items-center justify-center py-20 px-4 relative overflow-hidden">
		<!-- Background with parallax -->
		<div
			bind:this={backgroundElement}
			class="parallax-element fixed inset-0 bg-gradient-to-br from-primary-pale via-primary-cream to-white opacity-50 -z-10"
		></div>

		<div class="relative z-10 w-full max-w-2xl mx-auto text-center">
			<h1 class="text-9xl md:text-[12rem] font-display font-bold text-primary mb-4 leading-none">
				{is404 ? '404' : status}
			</h1>
			<p class="text-lg md:text-xl text-gray-700">
				{is404
					? "Page Not Found"
					: error?.message || 'Something went wrong'}
			</p>
		</div>
	</main>

	<Footer />
</div>

