<script>
	import { T, useTask } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import { Spring } from 'svelte/motion';
  import { OrbitControls, useGltf } from '@threlte/extras';

	interactivity();

	const scale = new Spring(1);

	let rotation = $state(0);
	useTask((delta) => {
		rotation += delta * 0.5; // Slow down rotation
	});
</script>

<T.PerspectiveCamera
	makeDefault
	position={[8, 8, 8]}
	oncreate={(ref) => {
		ref.lookAt(0, 0, 0);
	}}
>
  <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
</T.PerspectiveCamera>

  {#await useGltf('/assets/zenzak-earphone.gltf') then gltf}
    <T
      is={gltf.scene}
      scale={[2, 2, 2]}
      rotation.y={rotation}
      position={[0, -1, 0]}
    />
  {:catch error}
    <!-- Fallback if GLTF fails to load -->
    <T.Mesh
      rotation.y={rotation}
      position.y={0}
      scale={[1, 1, 1]}
    >
      <T.BoxGeometry args={[1, 1, 1]} />
      <T.MeshStandardMaterial color="orange" />
    </T.Mesh>
  {/await}

<!-- Optimized lighting setup -->
<T.AmbientLight intensity={0.6} />
<T.DirectionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
<T.PointLight position={[-3, 3, 3]} color="#4fc3f7" intensity={0.8} />
