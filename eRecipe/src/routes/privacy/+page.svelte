<script lang="ts">
	import PageLayout from '$lib/components/PageLayout.svelte';
</script>

<PageLayout title="Privacy Policy" description="eRecipe Privacy Policy and Data Protection">
	<div class="relative z-10 w-full max-w-4xl mx-auto">
		<div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 animate-scale-in">
			<h1 class="text-4xl md:text-5xl font-display font-bold text-primary mb-4">Privacy Policy</h1>
			<p class="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

			<div class="prose prose-lg max-w-none space-y-6 text-gray-700">
				<section>
					<h2 class="text-2xl font-display font-semibold text-gray-800 mb-3">1. Introduction</h2>
					<p>
						At eRecipe, we respect your privacy and are committed to protecting your personal data. This privacy policy
						explains how we collect, use, and safeguard your information when you use our service.
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-display font-semibold text-gray-800 mb-3">2. Information We Collect</h2>
					<p>We collect information that you provide directly to us, including:</p>
					<ul class="list-disc pl-6 space-y-2 mt-3">
						<li>Name and email address when you create an account</li>
						<li>Profile information you choose to provide</li>
						<li>Recipes, posts, and content you create</li>
						<li>Communication data when you contact us</li>
					</ul>
					<p class="mt-3">
						We also automatically collect certain information when you visit our website, such as your IP address, browser
						type, and usage patterns.
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-display font-semibold text-gray-800 mb-3">3. How We Use Your Information</h2>
					<p>We use the information we collect to:</p>
					<ul class="list-disc pl-6 space-y-2 mt-3">
						<li>Provide, maintain, and improve our services</li>
						<li>Process your transactions and send related information</li>
						<li>Send you technical notices and support messages</li>
						<li>Respond to your comments and questions</li>
						<li>Monitor and analyze trends and usage</li>
						<li>Detect, prevent, and address technical issues</li>
					</ul>
				</section>

				<section>
					<h2 class="text-2xl font-display font-semibold text-gray-800 mb-3">4. Information Sharing</h2>
					<p>
						We do not sell, trade, or rent your personal information to third parties. We may share your information only
						in the following circumstances:
					</p>
					<ul class="list-disc pl-6 space-y-2 mt-3">
						<li>With your consent</li>
						<li>To comply with legal obligations</li>
						<li>To protect and defend our rights or property</li>
						<li>With service providers who assist us in operating our website</li>
					</ul>
				</section>

				<section>
					<h2 class="text-2xl font-display font-semibold text-gray-800 mb-3">5. Data Security</h2>
					<p>
						We implement appropriate technical and organizational security measures to protect your personal information
						against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over
						the Internet is 100% secure.
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-display font-semibold text-gray-800 mb-3">6. Your Rights</h2>
					<p>You have the right to:</p>
					<ul class="list-disc pl-6 space-y-2 mt-3">
						<li>Access your personal data</li>
						<li>Correct inaccurate data</li>
						<li>Request deletion of your data</li>
						<li>Object to processing of your data</li>
						<li>Request restriction of processing</li>
						<li>Data portability</li>
					</ul>
				</section>

				<section>
					<h2 class="text-2xl font-display font-semibold text-gray-800 mb-3">7. Cookies</h2>
					<p>
						We use cookies and similar tracking technologies to track activity on our website and hold certain information.
						You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-display font-semibold text-gray-800 mb-3">8. Children's Privacy</h2>
					<p>
						Our service is not intended for children under the age of 13. We do not knowingly collect personal information
						from children under 13. If you are a parent or guardian and believe your child has provided us with personal
						information, please contact us.
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-display font-semibold text-gray-800 mb-3">9. Changes to This Policy</h2>
					<p>
						We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
						Privacy Policy on this page and updating the "Last updated" date.
					</p>
				</section>

				<section>
					<h2 class="text-2xl font-display font-semibold text-gray-800 mb-3">10. Contact Us</h2>
					<p>
						If you have any questions about this Privacy Policy, please contact us at{' '}
						<a href="mailto:privacy@erecipe.com" class="text-primary hover:text-primary-light">
							privacy@erecipe.com
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

