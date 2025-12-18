<script lang="ts">
	import { goto } from '$app/navigation';
	import PageLayout from '$lib/components/PageLayout.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import { validateEmail, validateForm } from '$lib/utils/validation';
	import { forgotPassword } from '$lib/api';

	let email = '';
	let errors: Record<string, string> = {};
	let isLoading = false;
	let isSubmitted = false;

	function handleEmailBlur() {
		const result = validateEmail(email);
		if (result.isValid) {
			delete errors.email;
		} else {
			errors.email = result.error || '';
		}
		errors = { ...errors };
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();

		const validationErrors = validateForm({
			email: {
				value: email,
				validators: [validateEmail]
			}
		});

		if (Object.keys(validationErrors).length > 0) {
			errors = validationErrors;
			return;
		}

		isLoading = true;
		errors = {};

		try {
			await forgotPassword(email);
			// Show success message
			isSubmitted = true;
		} catch (error: any) {
			// Even if API fails, show success message for security (don't reveal if email exists)
			isSubmitted = true;
		} finally {
			isLoading = false;
		}
	}
</script>

<PageLayout title="Forgot Password" description="Reset your eRecipe account password" showParallax={false}>
	<div class="flex items-center justify-center min-h-[calc(100vh-200px)]">
		<div class="relative z-10 w-full max-w-md">
			<div class="bg-white rounded-2xl shadow-xl p-8 animate-scale-in">
				<div class="text-center mb-8">
					<h1 class="text-4xl font-display font-bold text-gray-800 mb-2">Forgot Password?</h1>
					<p class="text-gray-600">
						{#if isSubmitted}
							We've sent password reset instructions to your email.
						{:else}
							Enter your email address and we'll send you instructions to reset your password.
						{/if}
					</p>
				</div>

				{#if isSubmitted}
					<div class="text-center space-y-6">
						<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-pale mb-4">
							<svg
								class="w-8 h-8 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
						<p class="text-gray-700 mb-6">
							Check your email inbox for password reset instructions. If you don't see the email, check your spam folder.
						</p>
						<button
							on:click={() => goto('/signin')}
							class="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-light transition-all duration-300 transform hover:scale-105 shadow-lg"
						>
							Back to Sign In
						</button>
					</div>
				{:else}
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
							{isLoading ? 'Sending...' : 'Send Reset Instructions'}
						</button>
					</form>

					<div class="mt-6 text-center">
						<a
							href="/signin"
							class="text-sm text-primary hover:text-primary-light transition-colors"
						>
							← Back to Sign In
						</a>
					</div>
				{/if}
			</div>
		</div>
	</div>
</PageLayout>

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

