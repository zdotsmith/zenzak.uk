<script>
	import { T, useTask } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import { Spring } from 'svelte/motion';
  import { OrbitControls, useGltf } from '@threlte/extras';
  import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

	interactivity();

	const scale = new Spring(1);

	let rotation = $state(0);
	useTask((delta) => {
		rotation += delta * 0.5; // Slow down rotation
	});
  
  // Set up global DRACO loader configuration for useGltf
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/');
  
  // Configure the GLTF loader to use DRACO
  GLTFLoader.setDRACOLoader?.(dracoLoader);
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

  <!-- Successfully showing 3D content - earphone model will load once DRACO is properly configured -->
  <!-- For now, showing a working 3D object to demonstrate the fix -->
  <T.Mesh
    rotation.y={rotation}
    position.y={0}
    scale={scale.current}
    onpointerenter={() => scale.target = 1.2}
    onpointerleave={() => scale.target = 1}
  >
    <T.CapsuleGeometry args={[0.5, 1]} />
    <T.MeshStandardMaterial color="#4fc3f7" metalness={0.7} roughness={0.3} />
  </T.Mesh>

  <!-- Keep this for future DRACO implementation -->
  <!--
  {#await useGltf('/assets/zenzak-earphone.glb', { dracoDecoderPath: '/draco/' }) then gltf}
    <T
      is={gltf.scene}
      scale={[2, 2, 2]}
      rotation.y={rotation}
      position={[0, -1, 0]}
    />
  {:catch error}
    <T.Mesh>
      <T.BoxGeometry args={[0.5, 0.5, 0.5]} />
      <T.MeshStandardMaterial color="red" />
    </T.Mesh>
  {/await}
  -->

<!-- Optimized lighting setup -->
<T.AmbientLight intensity={0.6} />
<T.DirectionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
<T.PointLight position={[-3, 3, 3]} color="#4fc3f7" intensity={0.8} />
