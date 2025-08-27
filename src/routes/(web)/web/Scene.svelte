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

  <!-- Load actual earphone models with working fallback -->
  {#await useGltf('/assets/zenzak-earphone-no-draco.glb') then gltf}
    <T
      is={gltf.scene}
      scale={[0.3, 0.3, 0.3]}
      rotation.y={rotation}
      position={[0, -0.5, 0]}
      onpointerenter={() => scale.target = 1.2}
      onpointerleave={() => scale.target = 1}
    />
  {:catch error}
    <!-- If GLB fails, try the GLTF text version -->
    {#await useGltf('/assets/zenzak-earphone.gltf') then gltfText}
      <T
        is={gltfText.scene}
        scale={[0.3, 0.3, 0.3]}
        rotation.y={rotation}
        position={[0, -0.5, 0]}
        onpointerenter={() => scale.target = 1.2}
        onpointerleave={() => scale.target = 1}
      />
    {:catch gltfError}
      <!-- Fallback: Custom earphone geometry -->
      <T.Group
        rotation.y={rotation}
        position={[0, -0.5, 0]}
        scale={scale.current}
        onpointerenter={() => scale.target = 1.2}
        onpointerleave={() => scale.target = 1}
      >
        <!-- Left earphone cup -->
        <T.Mesh position={[-0.8, 0, 0]}>
          <T.CylinderGeometry args={[0.35, 0.4, 0.2, 32]} />
          <T.MeshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </T.Mesh>
        <!-- Right earphone cup -->
        <T.Mesh position={[0.8, 0, 0]}>
          <T.CylinderGeometry args={[0.35, 0.4, 0.2, 32]} />
          <T.MeshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </T.Mesh>
        <!-- Headband -->
        <T.Mesh rotation={[0, 0, Math.PI/2]}>
          <T.TorusGeometry args={[0.9, 0.06, 8, 32, Math.PI]} />
          <T.MeshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.3} />
        </T.Mesh>
        <!-- Left adjustment slider -->
        <T.Mesh position={[-0.6, 0.4, 0]}>
          <T.BoxGeometry args={[0.1, 0.3, 0.08]} />
          <T.MeshStandardMaterial color="#333333" metalness={0.7} roughness={0.4} />
        </T.Mesh>
        <!-- Right adjustment slider -->
        <T.Mesh position={[0.6, 0.4, 0]}>
          <T.BoxGeometry args={[0.1, 0.3, 0.08]} />
          <T.MeshStandardMaterial color="#333333" metalness={0.7} roughness={0.4} />
        </T.Mesh>
        <!-- Connecting arms -->
        <T.Mesh position={[-0.6, 0.2, 0]} rotation={[0, 0, Math.PI/8]}>
          <T.CylinderGeometry args={[0.02, 0.03, 0.4]} />
          <T.MeshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.3} />
        </T.Mesh>
        <T.Mesh position={[0.6, 0.2, 0]} rotation={[0, 0, -Math.PI/8]}>
          <T.CylinderGeometry args={[0.02, 0.03, 0.4]} />
          <T.MeshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.3} />
        </T.Mesh>
      </T.Group>
    {/await}
  {/await}

<!-- Optimized lighting setup -->
<T.AmbientLight intensity={0.6} />
<T.DirectionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
<T.PointLight position={[-3, 3, 3]} color="#4fc3f7" intensity={0.8} />
