<script>
	import { T } from '@threlte/core';
	
	let { 
		position = [5, 5, 5],
		lookAt = [0, 0, 0],
		fov = 45,
		near = 0.1,
		far = 1000,
		makeDefault = true
	} = $props();
</script>

<T.PerspectiveCamera {position} {fov} {near} {far} {makeDefault} />