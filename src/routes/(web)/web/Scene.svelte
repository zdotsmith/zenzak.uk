<script>
	import { T, useTask } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import { Spring } from 'svelte/motion';
  import { OrbitControls, useGltf } from '@threlte/extras'

	interactivity();

	const scale = new Spring(1);

	let rotation = $state(0);
	useTask((delta) => {
		rotation += delta;
	});
</script>

<T.PerspectiveCamera
	makeDefault
	position={[10, 10, 10]}
	oncreate={(ref) => {
		ref.lookAt(0, 1, 0);
	}}
/>

<T.AmbientLight intensity={0.5} />
  <T.DirectionalLight position={[5, 5, 5]} />

  {#await useGltf('/assets/zenzak-earphone.glb') then gltf}
    <T
      is={gltf.scene}
      scale={0.1*[0.3, 0.3, 0.3]}
      rotation.y={rotation}
      position={[0, 0, 0]}
    />
  {/await}

<!-- Essential: Good lighting -->
<T.AmbientLight intensity={0.4} />
<T.DirectionalLight position={[0, 10, 5]} intensity={1.2} />
<T.PointLight position={[-3, 3, 3]} color="#4fc3f7" intensity={0.6} />

<T.Mesh
	rotation.y={rotation}
	position.y={1}
	scale={scale.current}
	onpointerenter={() => {
		scale.target = 1.5;
	}}
	onpointerleave={() => {
		scale.target = 1;
	}}
>
	<T.BoxGeometry args={[1, 2, 1]} />
	<T.MeshStandardMaterial color="hotpink" />
</T.Mesh>
