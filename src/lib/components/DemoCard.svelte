<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	
	let { 
		title, 
		description, 
		performance = {}, 
		codeSnippet = '',
		children 
	} = $props();
	
	let mounted = $state(false);
	
	onMount(() => {
		mounted = true;
	});
</script>

<div class="relative rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-lg">
	<div class="mb-4">
		<h3 class="text-xl font-semibold text-white mb-2">{title}</h3>
		<p class="text-gray-300 text-sm leading-relaxed">{description}</p>
	</div>
	
	{#if Object.keys(performance).length > 0}
		<div class="mb-4 flex gap-4 text-xs text-gray-400">
			{#each Object.entries(performance) as [key, value]}
				<span class="bg-white/10 px-2 py-1 rounded">
					{key}: {value}
				</span>
			{/each}
		</div>
	{/if}
	
	<div class="relative aspect-video mb-4 rounded-md overflow-hidden bg-gray-900">
		{#if browser && mounted}
			{@render children?.()}
		{:else}
			<div class="w-full h-full flex items-center justify-center text-gray-400">
				<div class="text-center">
					<div class="w-16 h-16 border-4 border-gray-600 border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
					<p>Loading 3D Experience...</p>
				</div>
			</div>
		{/if}
	</div>
	
	{#if codeSnippet}
		<details class="mt-4">
			<summary class="text-sm text-gray-400 cursor-pointer hover:text-white">View Code</summary>
			<pre class="mt-2 p-3 bg-black/40 rounded text-xs overflow-x-auto text-gray-300"><code>{codeSnippet}</code></pre>
		</details>
	{/if}
</div>