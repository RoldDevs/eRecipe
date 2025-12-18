<script lang="ts">
	import PageLayout from '$lib/components/PageLayout.svelte';
</script>

<PageLayout title="Terms of Service" description="eRecipe Terms of Service and User Agreement">
	<div class="relative z-10 w-full max-w-4xl mx-auto">
		<div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 animate-scale-in">
			<h1 class="text-4xl md:text-5xl font-display font-bold text-primary mb-4">Terms of Service</h1>
			<p class="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

			<div class="prose prose-lg max-w-none space-y-6 text-gray-700">
				<section>
					<h2 class="text-2xl font-display font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
					<p>
						By accessing and using eRecipe, you accept and agree to be bound by the terms and provision of this agreement.
						If you do not agree to abide by the above, please do not use this service.
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-display font-semibold text-gray-800 mb-3">2. Use License</h2>
					<p>
						Permission is granted to temporarily access the materials on eRecipe's website for personal, non-commercial
						transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you
						may not:
					</p>
					<ul class="list-disc pl-6 space-y-2 mt-3">
						<li>Modify or copy the materials</li>
						<li>Use the materials for any commercial purpose or for any public display</li>
						<li>Attempt to reverse engineer any software contained on eRecipe's website</li>
						<li>Remove any copyright or other proprietary notations from the materials</li>
					</ul>
				</section>

				<section>
					<h2 class="text-2xl font-display font-semibold text-gray-800 mb-3">3. User Accounts</h2>
					<p>
						When you create an account with us, you must provide information that is accurate, complete, and current at
						all times. You are responsible for safeguarding the password and for all activities that occur under your
						account.
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-display font-semibold text-gray-800 mb-3">4. Content</h2>
					<p>
						Our Service allows you to post, link, store, share and otherwise make available certain information, text,
						graphics, or other material. You are responsible for the content that you post on or through the Service,
						including its legality, reliability, and appropriateness.
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-display font-semibold text-gray-800 mb-3">5. Prohibited Uses</h2>
					<p>You may not use our Service:</p>
					<ul class="list-disc pl-6 space-y-2 mt-3">
						<li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
						<li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
						<li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
						<li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
						<li>To submit false or misleading information</li>
					</ul>
				</section>

				<section>
					<h2 class="text-2xl font-display font-semibold text-gray-800 mb-3">6. Termination</h2>
					<p>
						We may terminate or suspend your account and bar access to the Service immediately, without prior notice or
						liability, for any reason whatsoever, including without limitation if you breach the Terms.
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-display font-semibold text-gray-800 mb-3">7. Disclaimer</h2>
					<p>
						The materials on eRecipe's website are provided on an 'as is' basis. eRecipe makes no warranties, expressed or
						implied, and hereby disclaims and negates all other warranties including, without limitation, implied
						warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
						intellectual property or other violation of rights.
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-display font-semibold text-gray-800 mb-3">8. Limitations</h2>
					<p>
						In no event shall eRecipe or its suppliers be liable for any damages (including, without limitation, damages for
						loss of data or profit, or due to business interruption) arising out of the use or inability to use the
						materials on eRecipe's website.
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-display font-semibold text-gray-800 mb-3">9. Contact Information</h2>
					<p>
						If you have any questions about these Terms of Service, please contact us at{' '}
						<a href="mailto:support@erecipe.com" class="text-primary hover:text-primary-light">
							support@erecipe.com
						</a>
					</p>
				</section>
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

