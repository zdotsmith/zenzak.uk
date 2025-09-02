<!-- layout.svelte -->
<script lang="ts">
	import CanvasPortalTarget, { clearAllSnippets } from '$lib/components/CanvasPortalTarget.svelte';
	import { Canvas } from '@threlte/core';
	import { beforeNavigate } from '$app/navigation';
	import type { Snippet } from 'svelte';
	import '../../app.css';
	import Header from '$lib/components/Header.svelte';

	let { children }: { children: Snippet } = $props();

	// Clear all portal snippets before navigation
	beforeNavigate(() => {
		clearAllSnippets();
	});

	// Handle touch events by converting them to pointer events
	let canvasContainer: HTMLDivElement;

	const handleTouchEvent = (e: TouchEvent) => {
		e.preventDefault(); // Prevent scrolling and other default behaviors
		
		if (!canvasContainer) return;
		
		const touch = e.touches[0] || e.changedTouches[0];
		if (!touch) return;

		// Create synthetic pointer event
		const pointerType = e.type === 'touchstart' ? 'pointerdown' 
		                  : e.type === 'touchend' ? 'pointerup' 
		                  : 'pointermove';

		const syntheticEvent = new PointerEvent(pointerType, {
			pointerId: 1,
			bubbles: true,
			cancelable: true,
			pointerType: 'touch',
			clientX: touch.clientX,
			clientY: touch.clientY
		});

		canvasContainer.dispatchEvent(syntheticEvent);
	};
</script>

<Header />

<div 
	bind:this={canvasContainer}
	class="pointer-events-auto absolute inset-0 z-10" 
	style="touch-action: none;"
	on:touchstart={handleTouchEvent}
	on:touchmove={handleTouchEvent}
	on:touchend={handleTouchEvent}
>
	<Canvas>
		<CanvasPortalTarget />
	</Canvas>
</div>

{@render children()}
