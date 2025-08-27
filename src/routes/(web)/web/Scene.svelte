<script>
  import { T } from '@threlte/core'
  import { Float, Text } from '@threlte/extras'
  
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
  position={[8, 8, 8]} 
  fov={50}
  near={0.1}
  far={1000}
/>

<!-- Essential: Good lighting -->
<T.AmbientLight intensity={0.6} />
<T.DirectionalLight 
  position={[10, 10, 10]} 
  intensity={1.5}
  castShadow
/>
<T.PointLight 
  position={[-5, 5, 5]} 
  color="#ff6b6b" 
  intensity={0.8}
/>

<!-- Visible objects with bright colors -->
<Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
  <T.Mesh position={[-2, 0, 0]} rotation.y={time}>
    <T.BoxGeometry args={[1.5, 1.5, 1.5]} />
    <T.MeshStandardMaterial 
      color="#ff4444" 
      metalness={0.1} 
      roughness={0.3}
      emissive="#220000"
    />
  </T.Mesh>
</Float>

<Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
  <T.Mesh position={[2, 0, 0]} rotation.x={time * 0.7}>
    <T.SphereGeometry args={[1]} />
    <T.MeshStandardMaterial 
      color="#44ff44" 
      metalness={0.2} 
      roughness={0.2}
      emissive="#002200"
    />
  </T.Mesh>
</Float>

<Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6}>
  <T.Mesh position={[0, 2, 0]} rotation.z={time * 1.2}>
    <T.ConeGeometry args={[0.8, 2]} />
    <T.MeshStandardMaterial 
      color="#4444ff" 
      metalness={0.1} 
      roughness={0.4}
      emissive="#000022"
    />
  </T.Mesh>
</Float>

<!-- Ground plane for reference -->
<T.Mesh position={[0, -2, 0]} rotation.x={-Math.PI / 2}>
  <T.PlaneGeometry args={[10, 10]} />
  <T.MeshStandardMaterial 
    color="#333333" 
    transparent 
    opacity={0.3}
  />
</T.Mesh>

<!-- Debug text (optional) -->
<T.Group position={[0, 4, 0]}>
  <Text 
    text="3D Scene Working!" 
    fontSize={0.5}
    color="#ffffff"
    anchorX="center"
    anchorY="middle"
  />
</T.Group>