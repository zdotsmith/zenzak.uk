<script>
	import { T } from '@threlte/core';
	import { onMount } from 'svelte';
	
	let particles = $state([]);
	let time = $state(0);
	
	onMount(() => {
		// Create particle positions
		for (let i = 0; i < 100; i++) {
			particles.push({
				position: [
					(Math.random() - 0.5) * 20,
					(Math.random() - 0.5) * 20,
					(Math.random() - 0.5) * 20
				],
				velocity: [
					(Math.random() - 0.5) * 0.1,
					(Math.random() - 0.5) * 0.1,
					(Math.random() - 0.5) * 0.1
				]
			});
		}
		
		const animate = () => {
			time += 0.016;
			particles.forEach(particle => {
				particle.position[0] += particle.velocity[0];
				particle.position[1] += particle.velocity[1];
				particle.position[2] += particle.velocity[2];
			});
			requestAnimationFrame(animate);
		};
		animate();
	});
</script>

{#each particles as particle, i}
	<T.Mesh position={particle.position} scale={0.1}>
		<T.SphereGeometry args={[1, 8, 8]} />
		<T.MeshBasicMaterial color="#10b981" />
	</T.Mesh>
{/each}