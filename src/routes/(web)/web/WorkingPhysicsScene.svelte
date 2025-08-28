<script>
  import { T, useTask } from '@threlte/core'
  import { Vector3 } from 'three'
  
  export let mouse = { x: 0, y: 0 }
  export let currentAccent = 0
  
  // Configuration
  const accents = ['#4060ff', '#20ffa0', '#ff4060', '#ffcc00']
  
  // Helper functions
  function shuffle(accentIndex = 0) {
    return [
      { color: '#444', roughness: 0.1 },
      { color: '#444', roughness: 0.75 },
      { color: '#444', roughness: 0.75 },
      { color: 'white', roughness: 0.1 },
      { color: 'white', roughness: 0.75 },
      { color: 'white', roughness: 0.1 },
      { color: accents[accentIndex], roughness: 0.1, accent: true },
      { color: accents[accentIndex], roughness: 0.75, accent: true },
      { color: accents[accentIndex], roughness: 0.1, accent: true }
    ]
  }
  
  $: connectors = shuffle(currentAccent)
  
  // Simple floating animation
  let time = 0
  useTask((delta) => {
    time += delta
  })
</script>

<!-- Background -->
<T.Color attach="background" args={['#141622']} />

<!-- Lighting -->
<T.AmbientLight intensity={0.6} />
<T.SpotLight 
  position={[10, 10, 10]} 
  angle={0.3} 
  penumbra={1} 
  intensity={2} 
  castShadow 
/>

<!-- Floating Objects (Simulated Physics) -->
{#each connectors as props, i}
  <T.Group 
    position={[
      Math.sin(time * 0.5 + i) * 3,
      Math.cos(time * 0.3 + i) * 2,
      Math.sin(time * 0.4 + i) * 1.5
    ]}
    rotation={[
      time * 0.2 + i * 0.5,
      time * 0.15 + i * 0.3,
      time * 0.1 + i * 0.7
    ]}
  >
    <!-- Standard Box Mesh -->
    <T.Mesh castShadow receiveShadow>
      <T.BoxGeometry args={[1, 1, 1]} />
      <T.MeshStandardMaterial 
        metalness={0.3} 
        roughness={props.roughness}
        color={props.color}
      />
    </T.Mesh>
    
    {#if props.accent}
      <T.PointLight intensity={3} distance={4} color={props.color} />
    {/if}
  </T.Group>
{/each}

<!-- Special Glass Cube -->
<T.Group 
  position={[
    3 + Math.sin(time * 0.6) * 1.5,
    2 + Math.cos(time * 0.4) * 1,
    Math.sin(time * 0.5) * 0.8
  ]}
  rotation={[time * 0.3, time * 0.4, time * 0.2]}
>
  <T.Mesh castShadow receiveShadow>
    <T.BoxGeometry args={[1.2, 1.2, 1.2]} />
    <T.MeshPhysicalMaterial 
      clearcoat={1} 
      clearcoatRoughness={0}
      transmission={0.8}
      thickness={0.5}
      roughness={0.1}
      metalness={0}
      color="white"
      ior={1.5}
      opacity={0.9}
      transparent
    />
  </T.Mesh>
</T.Group>

<!-- Ground plane for shadow -->
<T.Mesh position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
  <T.PlaneGeometry args={[20, 20]} />
  <T.MeshStandardMaterial color="#222" transparent opacity={0.3} />
</T.Mesh>