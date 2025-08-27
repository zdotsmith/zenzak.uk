<script>
	import { T } from '@threlte/core';
	import { onMount } from 'svelte';
	
	let cubes = $state([]);
	let time = $state(0);
	
	onMount(() => {
		// Create animated sequence of cubes
		for (let i = 0; i < 8; i++) {
			cubes.push({
				position: [i * 1.5 - 5, 0, 0],
				delay: i * 0.2,
				scale: 1
			});
		}
		
		const animate = () => {
			time += 0.016;
			
			cubes.forEach((cube, i) => {
				const animTime = time + cube.delay;
				cube.position[1] = Math.sin(animTime * 3) * 2;
				cube.scale = 1 + Math.sin(animTime * 2) * 0.3;
			});
			
			requestAnimationFrame(animate);
		};
		animate();
	});
</script>

{#each cubes as cube, i}
	<T.Mesh position={cube.position} scale={cube.scale}>
		<T.BoxGeometry args={[0.8, 0.8, 0.8]} />
		<T.MeshStandardMaterial color={`hsl(${i * 45}, 70%, 60%)`} />
	</T.Mesh>
{/each}