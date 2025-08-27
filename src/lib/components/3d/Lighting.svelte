<script>
	import { T } from '@threlte/core';
	
	let { 
		ambientIntensity = 0.4,
		directionalIntensity = 1.0,
		directionalPosition = [5, 5, 5],
		directionalColor = '#ffffff',
		ambientColor = '#ffffff',
		castShadows = true
	} = $props();
</script>

<T.AmbientLight intensity={ambientIntensity} color={ambientColor} />
<T.DirectionalLight 
	position={directionalPosition} 
	intensity={directionalIntensity} 
	color={directionalColor}
	castShadow={castShadows}
/>