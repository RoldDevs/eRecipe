<script lang="ts">
	export let label: string;
	export let type: string = 'text';
	export let name: string;
	export let value: string = '';
	export let placeholder: string = '';
	export let required: boolean = false;
	export let error: string = '';
	export let autocomplete: string | undefined = undefined;

	$: inputId = `input-${name}`;

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		value = target.value;
	}
</script>

<div class="mb-4">
	<label for={inputId} class="block text-sm font-medium text-gray-700 mb-2">
		{label}
		{#if required}
			<span class="text-primary">*</span>
		{/if}
	</label>
	<input
		id={inputId}
		{type}
		name={name}
		value={value}
		placeholder={placeholder}
		required={required}
		autocomplete={autocomplete}
		class="w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent {error
			? 'border-red-500'
			: 'border-gray-300 hover:border-primary-pale'}"
		on:input={handleInput}
	/>
	{#if error}
		<p class="mt-1 text-sm text-red-500">{error}</p>
	{/if}
</div>

