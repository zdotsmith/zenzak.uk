<script>
  import { Canvas } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import Scene from './Scene.svelte'
</script>

<div class="absolute inset-0 w-full h-full">
  <Canvas>
    <Scene />
    <OrbitControls 
      enableDamping 
      dampingFactor={0.05}
      minDistance={3}
      maxDistance={20}
      target={[0, 0, 0]}
    />
  </Canvas>
</div>

<style>
  div {
    background: transparent;
  }
</style>