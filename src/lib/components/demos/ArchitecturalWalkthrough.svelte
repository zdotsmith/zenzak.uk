<script>
	import { T } from '@threlte/core';
	import { onMount } from 'svelte';
	
	let spheres = $state([]);
	let time = $state(0);
	
	onMount(() => {
		// Create floating spheres
		for (let i = 0; i < 5; i++) {
			spheres.push({
				position: [
					(Math.random() - 0.5) * 10,
					(Math.random() - 0.5) * 10,
					(Math.random() - 0.5) * 10
				],
				scale: Math.random() * 0.5 + 0.5,
				speed: Math.random() * 0.02 + 0.01
			});
		}
		
		const animate = () => {
			time += 0.016;
			requestAnimationFrame(animate);
		};
		animate();
	});
</script>

{#each spheres as sphere, i}
	<T.Mesh position={sphere.position} scale={sphere.scale}>
		<T.SphereGeometry args={[1, 16, 16]} />
		<T.MeshStandardMaterial color="#ec4899" transparent opacity={0.7} />
	</T.Mesh>
{/each}

<!-- Simple room structure -->
<T.Mesh position={[0, -2, 0]}>
	<T.BoxGeometry args={[10, 0.2, 10]} />
	<T.MeshStandardMaterial color="#374151" />
</T.Mesh>