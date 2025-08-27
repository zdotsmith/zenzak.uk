<script>
	import { OrbitControls } from '@threlte/extras';
	
	let { 
		enableDamping = true,
		dampingFactor = 0.05,
		enableZoom = true,
		enableRotate = true,
		enablePan = true,
		autoRotate = false,
		autoRotateSpeed = 2.0,
		maxPolarAngle = Math.PI,
		minDistance = 1,
		maxDistance = 100
	} = $props();
</script>

<OrbitControls 
	{enableDamping}
	{dampingFactor}
	{enableZoom}
	{enableRotate}
	{enablePan}
	{autoRotate}
	{autoRotateSpeed}
	{maxPolarAngle}
	{minDistance}
	{maxDistance}
/>