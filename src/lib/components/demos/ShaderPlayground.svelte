<script>
	import { T } from '@threlte/core';
	import { onMount } from 'svelte';
	
	let meshRef = $state();
	let time = $state(0);
	
	onMount(() => {
		const animate = () => {
			time += 0.016;
			if (meshRef) {
				// Simple shader-like effect with color cycling
				const hue = (Math.sin(time) + 1) * 180;
				meshRef.material.color.setHSL(hue / 360, 0.8, 0.5);
			}
			requestAnimationFrame(animate);
		};
		animate();
	});
</script>

<T.Mesh bind:ref={meshRef} position={[0, 0, 0]}>
	<T.SphereGeometry args={[2, 32, 32]} />
	<T.MeshStandardMaterial />
</T.Mesh>