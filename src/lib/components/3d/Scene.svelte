<script>
	import { Canvas } from '@threlte/core';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	
	let { 
		background = '#040b14', 
		fog = true, 
		shadows = true,
		children 
	} = $props();
	
	let mounted = $state(false);
	
	onMount(() => {
		mounted = true;
	});
</script>

<div class="w-full h-full">
	{#if browser && mounted}
		<Canvas {background}>
			{@render children?.()}
		</Canvas>
	{:else}
		<div class="w-full h-full flex items-center justify-center" style="background: {background}">
			<div class="text-white text-center">
				<div class="w-16 h-16 border-4 border-gray-600 border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
				<p>Loading 3D Scene...</p>
			</div>
		</div>
	{/if}
</div>