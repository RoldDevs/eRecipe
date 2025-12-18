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
		? "Oops! The page you're looking for seems to have wandered off into the kitchen..."
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

	<main class="flex-grow flex items-center justify-center min-h-[calc(100vh-160px)] px-4 relative overflow-hidden">
		<!-- Background with parallax -->
		<div
			bind:this={backgroundElement}
			class="parallax-element fixed inset-0 bg-gradient-to-br from-primary-pale via-primary-cream to-white opacity-60 -z-10"
		></div>

		<!-- Decorative floating elements -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<div class="absolute top-20 left-10 w-32 h-32 bg-primary-pale rounded-full opacity-30 blur-2xl animate-float"></div>
			<div class="absolute bottom-20 right-10 w-40 h-40 bg-primary-cream rounded-full opacity-30 blur-2xl animate-float-delayed"></div>
			<div class="absolute top-1/2 left-1/4 w-24 h-24 bg-primary-light rounded-full opacity-20 blur-xl animate-float-slow"></div>
		</div>

		<div class="relative z-10 w-full max-w-3xl mx-auto text-center fade-in-on-scroll">
			<!-- Error Number -->
			<h1 class="text-8xl md:text-[10rem] font-display font-bold text-primary mb-6 leading-none animate-slide-down drop-shadow-lg">
				{is404 ? '404' : status}
			</h1>

			<!-- Error Message -->
			<h2 class="text-2xl md:text-3xl font-display font-semibold text-gray-800 mb-4 animate-slide-up">
				{is404 ? "Page Not Found" : "Oops! Something Went Wrong"}
			</h2>
			
			<p class="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto animate-fade-in">
				{errorMessage}
			</p>

			<!-- Call to Action -->
			<div class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
				<button
					on:click={goHome}
					class="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-light transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
					</svg>
					Go Back Home
				</button>
				
				{#if is404}
					<button
						on:click={() => window.history.back()}
						class="bg-transparent border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
						</svg>
						Go Back
					</button>
				{/if}
			</div>
		</div>
	</main>

	<Footer />
</div>

<style>
	@keyframes float {
		0%, 100% {
			transform: translateY(0px) translateX(0px);
		}
		33% {
			transform: translateY(-20px) translateX(10px);
		}
		66% {
			transform: translateY(10px) translateX(-10px);
		}
	}

	@keyframes floatDelayed {
		0%, 100% {
			transform: translateY(0px) translateX(0px);
		}
		33% {
			transform: translateY(15px) translateX(-15px);
		}
		66% {
			transform: translateY(-10px) translateX(15px);
		}
	}

	@keyframes floatSlow {
		0%, 100% {
			transform: translateY(0px) translateX(0px);
		}
		50% {
			transform: translateY(-15px) translateX(5px);
		}
	}

	.animate-float {
		animation: float 6s ease-in-out infinite;
	}

	.animate-float-delayed {
		animation: floatDelayed 8s ease-in-out infinite;
		animation-delay: 1s;
	}

	.animate-float-slow {
		animation: floatSlow 10s ease-in-out infinite;
		animation-delay: 2s;
	}
</style>

