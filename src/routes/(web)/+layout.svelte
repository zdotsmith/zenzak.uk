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

		// Create synthetic pointer event with improved touch handling
		const pointerType =
			e.type === 'touchstart' ? 'pointerdown' : e.type === 'touchend' ? 'pointerup' : 'pointermove';

		const syntheticEvent = new PointerEvent(pointerType, {
			pointerId: 1,
			bubbles: true,
			cancelable: true,
			pointerType: 'touch',
			clientX: touch.clientX,
			clientY: touch.clientY,
			// Add pressure for better mobile compatibility
			pressure: e.type === 'touchend' ? 0 : 1
		});

		canvasContainer.dispatchEvent(syntheticEvent);
	};

	// Throttle touch move events for better performance on mobile
	let touchMoveThrottled = false;
	const handleTouchMove = (e: TouchEvent) => {
		if (touchMoveThrottled) return;
		touchMoveThrottled = true;

		requestAnimationFrame(() => {
			handleTouchEvent(e);
			touchMoveThrottled = false;
		});
	};
</script>

<Header />

<div
	bind:this={canvasContainer}
	class="pointer-events-auto absolute inset-0 z-10"
	style="touch-action: none; -webkit-touch-callout: none; -webkit-user-select: none;"
	ontouchstart={handleTouchEvent}
	ontouchmove={handleTouchMove}
	ontouchend={handleTouchEvent}
>
	<Canvas>
		<CanvasPortalTarget />
	</Canvas>
</div>

{@render children()}
