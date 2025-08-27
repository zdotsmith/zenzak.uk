<script>
	import { T } from '@threlte/core';
	import { onMount } from 'svelte';
	
	let boxRef = $state();
	let sphereRef = $state();
	let time = $state(0);
	
	onMount(() => {
		const animate = () => {
			time += 0.016;
			
			// Simple physics simulation - bouncing
			if (boxRef && sphereRef) {
				boxRef.position.y = Math.sin(time * 2) * 2;
				sphereRef.position.x = Math.cos(time * 1.5) * 3;
			}
			requestAnimationFrame(animate);
		};
		animate();
	});
</script>

<!-- Ground plane -->
<T.Mesh position={[0, -3, 0]}>
	<T.BoxGeometry args={[10, 0.5, 10]} />
	<T.MeshStandardMaterial color="#374151" />
</T.Mesh>

<!-- Bouncing box -->
<T.Mesh bind:ref={boxRef} position={[0, 0, 0]}>
	<T.BoxGeometry args={[1, 1, 1]} />
	<T.MeshStandardMaterial color="#dc2626" />
</T.Mesh>

<!-- Moving sphere -->
<T.Mesh bind:ref={sphereRef} position={[0, 1, 0]}>
	<T.SphereGeometry args={[0.5, 16, 16]} />
	<T.MeshStandardMaterial color="#2563eb" />
</T.Mesh>