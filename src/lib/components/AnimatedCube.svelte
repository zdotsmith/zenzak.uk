<script>
	import { Canvas } from '@threlte/core';
	import { T } from '@threlte/core';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// Props for customization
	export let size = 2;
	export let rotationSpeed = 0.008;
	export let materialColor = '#4c7fff';

	// Internal state
	let cubeRef;
	let wireframeCubeRef;
	let animationId;

	// Animation function using requestAnimationFrame
	function animate() {
		if (cubeRef && wireframeCubeRef && browser) {
			cubeRef.rotation.x += rotationSpeed;
			cubeRef.rotation.y += rotationSpeed * 0.7;
			cubeRef.rotation.z += rotationSpeed * 0.3;

			// Wireframe cube rotates slightly differently for visual interest
			wireframeCubeRef.rotation.x += rotationSpeed * 0.5;
			wireframeCubeRef.rotation.y += rotationSpeed * 0.9;
			wireframeCubeRef.rotation.z += rotationSpeed * 0.6;
		}
		animationId = requestAnimationFrame(animate);
	}

	onMount(() => {
		if (browser) {
			animate();
		}

		return () => {
			if (animationId) {
				cancelAnimationFrame(animationId);
			}
		};
	});
</script>

{#if browser}
	<div class="threlte-container">
		<Canvas>
			<!-- Scene setup -->
			<T.PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />

			<!-- Enhanced lighting for better visibility -->
			<T.AmbientLight intensity={0.6} />
			<T.DirectionalLight position={[5, 5, 5]} intensity={1.2} />
			<T.DirectionalLight position={[-5, -5, -5]} intensity={0.8} />
			<T.PointLight position={[0, 0, 10]} intensity={0.5} />

			<!-- Main solid cube -->
			<T.Mesh bind:ref={cubeRef}>
				<T.BoxGeometry args={[size, size, size]} />
				<T.MeshStandardMaterial
					color={materialColor}
					transparent
					opacity={0.7}
					roughness={0.2}
					metalness={0.3}
					emissive={materialColor}
					emissiveIntensity={0.1}
				/>
			</T.Mesh>

			<!-- Wireframe cube overlay -->
			<T.Mesh bind:ref={wireframeCubeRef}>
				<T.BoxGeometry args={[size * 1.05, size * 1.05, size * 1.05]} />
				<T.MeshBasicMaterial color="#ffffff" wireframe={true} transparent opacity={0.4} />
			</T.Mesh>

			<!-- Additional smaller cubes for visual interest -->
			<T.Mesh position={[3, 2, -2]} rotation={[0.5, 0.5, 0]}>
				<T.BoxGeometry args={[0.5, 0.5, 0.5]} />
				<T.MeshStandardMaterial color="#64748b" transparent opacity={0.3} />
			</T.Mesh>

			<T.Mesh position={[-3, -2, -2]} rotation={[1, 1, 0.5]}>
				<T.BoxGeometry args={[0.3, 0.3, 0.3]} />
				<T.MeshStandardMaterial color="#94a3b8" transparent opacity={0.2} />
			</T.Mesh>
		</Canvas>
	</div>
{/if}

<style>
	.threlte-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.threlte-container :global(canvas) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
