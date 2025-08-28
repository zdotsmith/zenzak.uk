<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import ParticleAttractor from './ParticleAttractor.svelte';
</script>

<!-- Camera -->
<T.PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50}>
	<OrbitControls
		enableDamping
		enablePan={false}
		enableZoom={true}
		minDistance={5}
		maxDistance={30}
	/>
</T.PerspectiveCamera>

<!-- Enhanced Lighting for Lusion-style ambiance -->
<T.AmbientLight intensity={0.3} color={0x4444ff} />
<T.DirectionalLight position={[10, 10, 5]} intensity={1.2} castShadow color={0xffffff} />
<T.DirectionalLight position={[-10, -10, -5]} intensity={0.4} color={0xff8844} />
<T.DirectionalLight position={[0, -15, 0]} intensity={0.6} color={0x44ffff} />

<!-- Atmospheric fog for depth -->
<T.Fog color={0x1a1a2e} near={10} far={50} />

<!-- Particle System -->
<ParticleAttractor />
