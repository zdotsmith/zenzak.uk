<script>
	import { T } from '@threlte/core';
	import { onMount } from 'svelte';
	
	let meshRef = $state();
	let rotationY = $state(0);
	
	onMount(() => {
		const animate = () => {
			rotationY += 0.01;
			if (meshRef) {
				meshRef.rotation.y = rotationY;
			}
			requestAnimationFrame(animate);
		};
		animate();
	});
	
	let { 
		color = '#4f46e5',
		wireframe = false 
	} = $props();
</script>

<T.Mesh bind:ref={meshRef} position={[0, 0, 0]}>
	<T.BoxGeometry args={[2, 2, 2]} />
	<T.MeshStandardMaterial {color} {wireframe} />
</T.Mesh>