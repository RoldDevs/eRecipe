<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import { validateEmail, validatePassword, validateForm } from '$lib/utils/validation';
	import { createParallaxEffect } from '$lib/utils/animations';
	import { signin } from '$lib/api';
	import { authStore } from '$lib/stores/auth';

	let email = '';
	let password = '';
	let errors: Record<string, string> = {};
	let isLoading = false;
	let backgroundElement: HTMLElement;
	let parallaxCleanup: (() => void) | null = null;

	onMount(() => {
		if (backgroundElement) {
			parallaxCleanup = createParallaxEffect(backgroundElement, 0.3);
		}

		return () => {
			if (parallaxCleanup) parallaxCleanup();
		};
	});

	function handleEmailBlur() {
		const result = validateEmail(email);
		if (result.isValid) {
			delete errors.email;
		} else {
			errors.email = result.error || '';
		}
		errors = { ...errors };
	}

	function handlePasswordBlur() {
		const result = validatePassword(password);
		if (result.isValid) {
			delete errors.password;
		} else {
			errors.password = result.error || '';
		}
		errors = { ...errors };
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();

		const validationErrors = validateForm({
			email: {
				value: email,
				validators: [validateEmail]
			},
			password: {
				value: password,
				validators: [validatePassword]
			}
		});

		if (Object.keys(validationErrors).length > 0) {
			errors = validationErrors;
			return;
		}

		isLoading = true;
		errors = {};

		try {
			const response = await signin({ email, password });
			
			// Store user and token
			authStore.login(response.user, response.token);
			
			// On success, redirect to home
			goto('/');
		} catch (error: any) {
			errors.submit = error.message || 'Invalid email or password. Please try again.';
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Sign In - eRecipe</title>
	<meta name="description" content="Sign in to your eRecipe account" />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<Header />

	<main class="flex-grow flex items-center justify-center py-20 px-4 relative overflow-hidden">
		<!-- Background with parallax -->
		<div
			bind:this={backgroundElement}
			class="parallax-element fixed inset-0 bg-gradient-to-br from-primary-pale via-primary-cream to-white opacity-50 -z-10"
		></div>

		<div class="relative z-10 w-full max-w-md">
			<div class="bg-white rounded-2xl shadow-xl p-8 animate-scale-in">
				<div class="text-center mb-8">
					<h1 class="text-4xl font-display font-bold text-gray-800 mb-2">Welcome Back</h1>
					<p class="text-gray-600">Sign in to continue to eRecipe</p>
				</div>

				<form on:submit={handleSubmit} class="space-y-4">
					<FormInput
						label="Email"
						type="email"
						name="email"
						bind:value={email}
						placeholder="Enter your email"
						required={true}
						error={errors.email}
						autocomplete="email"
						on:blur={handleEmailBlur}
					/>

					<FormInput
						label="Password"
						type="password"
						name="password"
						bind:value={password}
						placeholder="Enter your password"
						required={true}
						error={errors.password}
						autocomplete="current-password"
						on:blur={handlePasswordBlur}
					/>

					<div class="flex items-center justify-between mb-4">
						<label class="flex items-center">
							<input type="checkbox" class="mr-2 rounded text-primary focus:ring-primary" />
							<span class="text-sm text-gray-600">Remember me</span>
						</label>
						<a
							href="/forgot-password"
							class="text-sm text-primary hover:text-primary-light transition-colors"
						>
							Forgot password?
						</a>
					</div>

					{#if errors.submit}
						<div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
							{errors.submit}
						</div>
					{/if}

					<button
						type="submit"
						disabled={isLoading}
						class="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-light transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
					>
						{isLoading ? 'Signing in...' : 'Sign In'}
					</button>
				</form>

				<div class="mt-6 text-center">
					<p class="text-gray-600">
						Don't have an account?
						<a
							href="/signup"
							class="text-primary font-semibold hover:text-primary-light transition-colors"
						>
							Sign up
						</a>
					</p>
				</div>
			</div>
		</div>
	</main>

	<Footer />
</div>

<style>
	@keyframes scaleIn {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.animate-scale-in {
		animation: scaleIn 0.4s ease-out;
	}
</style>

