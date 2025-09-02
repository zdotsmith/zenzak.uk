<script>
	import { interactivity } from '@threlte/extras';
	import { useThrelte, useDOM, watch } from '@threlte/core';

	// Get DOM and camera references
	const { dom } = useDOM();
	const { camera } = useThrelte();

	// Enhanced compute function that handles both mouse and touch events
	const touchAwareCompute = (event, state) => {
		if (!dom.current) return;
		
		const rect = dom.current.getBoundingClientRect();
		const width = dom.current.clientWidth;
		const height = dom.current.clientHeight;
		
		let clientX, clientY;

		// Handle touch events - prioritize touch over mouse/pointer
		if (event.touches && event.touches.length > 0) {
			clientX = event.touches[0].clientX;
			clientY = event.touches[0].clientY;
		}
		// Handle changed touches (for touchend events)
		else if (event.changedTouches && event.changedTouches.length > 0) {
			clientX = event.changedTouches[0].clientX;
			clientY = event.changedTouches[0].clientY;
		}
		// Handle pointer/mouse events
		else if (event.clientX !== undefined && event.clientY !== undefined) {
			clientX = event.clientX;
			clientY = event.clientY;
		}
		// Fallback to offset coordinates if available
		else if (event.offsetX !== undefined && event.offsetY !== undefined) {
			clientX = event.offsetX + rect.left;
			clientY = event.offsetY + rect.top;
		}
		else {
			// Default to center if no coordinates available
			clientX = rect.left + width / 2;
			clientY = rect.top + height / 2;
		}

		// Convert to canvas-relative coordinates
		const x = clientX - rect.left;
		const y = clientY - rect.top;

		// Convert to normalized device coordinates (-1 to 1)
		state.pointer.update((pointer) => {
			pointer.set((x / width) * 2 - 1, -(y / height) * 2 + 1);
			return pointer;
		});

		// Update raycaster
		if (camera.current) {
			state.raycaster.setFromCamera(state.pointer.current, camera.current);
		}
	};

	// Setup touch event handlers to supplement pointer events
	const setupTouchEvents = () => {
		if (!dom.current) return;

		const target = dom.current;
		
		// Create synthetic pointer events from touch events
		const createPointerEventFromTouch = (touchEvent, type) => {
			const touch = touchEvent.touches[0] || touchEvent.changedTouches[0];
			if (!touch) return null;

			// Map touch event types to pointer event types
			let pointerType = 'pointermove';
			if (type === 'touchstart') pointerType = 'pointerdown';
			else if (type === 'touchend') pointerType = 'pointerup';
			else if (type === 'touchmove') pointerType = 'pointermove';

			return new PointerEvent(pointerType, {
				pointerId: 1,
				bubbles: true,
				cancelable: true,
				pointerType: 'touch',
				clientX: touch.clientX,
				clientY: touch.clientY,
				touches: touchEvent.touches,
				changedTouches: touchEvent.changedTouches
			});
		};

		const handleTouchEvent = (e) => {
			e.preventDefault(); // Prevent default touch behaviors like scrolling
			
			// Create and dispatch equivalent pointer event
			const syntheticPointerEvent = createPointerEventFromTouch(e, e.type);
			if (syntheticPointerEvent) {
				target.dispatchEvent(syntheticPointerEvent);
			}
		};

		// Add touch event listeners
		target.addEventListener('touchstart', handleTouchEvent, { passive: false });
		target.addEventListener('touchmove', handleTouchEvent, { passive: false });
		target.addEventListener('touchend', handleTouchEvent, { passive: false });

		return () => {
			target.removeEventListener('touchstart', handleTouchEvent);
			target.removeEventListener('touchmove', handleTouchEvent);
			target.removeEventListener('touchend', handleTouchEvent);
		};
	};

	// Enable interactivity with our custom compute function
	interactivity({
		compute: touchAwareCompute
	});

	// Setup touch event handling when DOM is ready
	watch(dom, (domElement) => {
		if (domElement) {
			return setupTouchEvents();
		}
	});
</script>