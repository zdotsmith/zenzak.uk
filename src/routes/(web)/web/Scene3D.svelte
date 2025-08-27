<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
</script>

<div class="absolute inset-0 w-full h-full" style="min-height: 400px;">
  <Canvas background="#1a1a2e">
    <Scene />
  </Canvas>
</div>