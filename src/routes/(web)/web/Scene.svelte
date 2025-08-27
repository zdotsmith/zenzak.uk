<script>
  import { T } from '@threlte/core'
  
  let time = 0
  
  function updateTime() {
    time += 0.01
    requestAnimationFrame(updateTime)
  }
  updateTime()
</script>

<!-- Essential: Camera must be positioned properly -->
<T.PerspectiveCamera 
  makeDefault 
  position={[5, 3, 5]} 
  fov={75}
  near={0.1}
  far={1000}
/>

<!-- Essential: Good lighting -->
<T.AmbientLight intensity={0.4} />
<T.DirectionalLight 
  position={[10, 10, 5]} 
  intensity={1.2}
/>
<T.PointLight 
  position={[-3, 3, 3]} 
  color="#4fc3f7" 
  intensity={0.6}
/>

<!-- Animated rotating cube -->
<T.Mesh position={[-1.5, 1, 0]} rotation.x={time} rotation.y={time * 1.2}>
  <T.BoxGeometry args={[1.2, 1.2, 1.2]} />
  <T.MeshStandardMaterial 
    color="#ff4444" 
    metalness={0.3} 
    roughness={0.4}
  />
</T.Mesh>

<!-- Animated sphere -->
<T.Mesh position={[1.5, 1, 0]} rotation.x={time * 0.8}>
  <T.SphereGeometry args={[0.8]} />
  <T.MeshStandardMaterial 
    color="#44ff44"
    metalness={0.2}
    roughness={0.3}
  />
</T.Mesh>

<!-- Animated cone -->
<T.Mesh position={[0, 2.5, 0]} rotation.z={time * 1.5}>
  <T.ConeGeometry args={[0.6, 1.5]} />
  <T.MeshStandardMaterial 
    color="#4444ff"
    metalness={0.1}
    roughness={0.5}
  />
</T.Mesh>

<!-- Ground plane -->
<T.Mesh position={[0, -0.5, 0]} rotation.x={-Math.PI / 2}>
  <T.PlaneGeometry args={[8, 8]} />
  <T.MeshStandardMaterial 
    color="#2a2a3e" 
    transparent 
    opacity={0.7}
  />
</T.Mesh>