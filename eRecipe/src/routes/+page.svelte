<script lang="ts">
	import { onMount } from 'svelte';
	import { getHealth, getRoot } from '$lib/api';

	let apiStatus = 'Checking';
	let apiMessage = '';
	let error = '';

	onMount(async () => {
		try {
			const health = await getHealth();
			apiStatus = health.status === 'healthy' ? 'Connected' : 'Unknown';
			
			const root = await getRoot();
			apiMessage = root.message || '';
		} catch (err) {
			apiStatus = '❌ Disconnected';
			error = err instanceof Error ? err.message : 'Failed to connect to backend';
		}
	});
</script>

<div class="min-h-screen bg-gray-50">
	<main class="container mx-auto px-4 py-8">
		<h1 class="text-4xl font-bold text-gray-900 mb-4">Welcome to eRecipe</h1>
		<p class="text-lg text-gray-600 mb-6">
			A new eCommerce app focused on foods, menus, restaurants, and more.
		</p>
		
		<div class="bg-white rounded-lg shadow-md p-6 max-w-md">
			<h2 class="text-xl font-semibold text-gray-800 mb-4">Backend Connection</h2>
			<div class="space-y-2">
				<p class="text-sm text-gray-600">
					<span class="font-medium">Status:</span> 
					<span class="ml-2">{apiStatus}</span>
				</p>
				{#if apiMessage}
					<p class="text-sm text-gray-600">
						<span class="font-medium">Message:</span> 
						<span class="ml-2">{apiMessage}</span>
					</p>
				{/if}
				{#if error}
					<p class="text-sm text-red-600">
						<span class="font-medium">Error:</span> 
						<span class="ml-2">{error}</span>
					</p>
					<p class="text-xs text-gray-500 mt-2">
						Make sure the backend is running on http://localhost:8000
					</p>
				{/if}
			</div>
		</div>
	</main>
</div>

