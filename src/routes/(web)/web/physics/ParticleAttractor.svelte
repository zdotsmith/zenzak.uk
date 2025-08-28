<script lang="ts">
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat';
	import { T, useTask, useThrelte } from '@threlte/core';
	import { RigidBody, Collider } from '@threlte/rapier';
	import {
		SphereGeometry,
		MeshStandardMaterial,
		Vector3,
		Color,
		BufferGeometry,
		LineBasicMaterial,
		Line
	} from 'three';
	import { onMount } from 'svelte';

	// Configuration
	const PARTICLE_COUNT = 50;
	const ATTRACTION_FORCE = 3.0;
	const MOUSE_REPEL_FORCE = 35;
	const MOUSE_REPEL_RADIUS = 3.5;
	const DAMPING = 0.985;
	const PARTICLE_RADIUS = 0.12;
	const CONNECTION_DISTANCE = 4.5;
	const BOUNCE_RESTITUTION = 0.6;

	// Create shared geometry and materials
	const sphereGeometry = new SphereGeometry(PARTICLE_RADIUS, 16, 12);
	const materials = Array.from(
		{ length: 8 },
		(_, i) =>
			new MeshStandardMaterial({
				color: new Color().setHSL(0.15 + i * 0.08, 0.9, 0.7),
				metalness: 0.8,
				roughness: 0.2,
				emissive: new Color().setHSL(0.15 + i * 0.08, 0.7, 0.4),
				emissiveIntensity: 0.3
			})
	);

	// Mouse tracking and invisible collider
	let mouseX = $state(0);
	let mouseY = $state(0);
	let mouseWorldPos = $state(new Vector3());
	let mouseColliderBody: RapierRigidBody | undefined = $state();

	const { camera } = useThrelte();

	// Particle data
	interface Particle {
		rigidBody?: RapierRigidBody;
		position: Vector3;
		initialVelocity: Vector3;
		materialIndex: number;
		id: string;
	}

	let particles: Particle[] = $state(
		Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
			position: new Vector3(
				(Math.random() - 0.5) * 8,
				(Math.random() - 0.5) * 8,
				(Math.random() - 0.5) * 4
			),
			initialVelocity: new Vector3(
				(Math.random() - 0.5) * 0.5,
				(Math.random() - 0.5) * 0.5,
				(Math.random() - 0.5) * 0.2
			),
			materialIndex: i % materials.length,
			id: `particle-${i}`
		}))
	);

	// Mouse event handling
	onMount(() => {
		if (typeof window === 'undefined') return;

		const handleMouseMove = (event: MouseEvent) => {
			mouseX = (event.clientX / window.innerWidth) * 2 - 1;
			mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

			const cameraInstance = $camera;
			if (cameraInstance) {
				// Calculate mouse position in 3D space
				const vector = new Vector3(mouseX, mouseY, 0.5);
				vector.unproject(cameraInstance);
				const dir = vector.sub(cameraInstance.position).normalize();
				const distance = -cameraInstance.position.z / dir.z;
				const newMousePos = cameraInstance.position.clone().add(dir.multiplyScalar(distance));
				mouseWorldPos = newMousePos;

				// Update mouse collider position
				if (mouseColliderBody) {
					mouseColliderBody.setTranslation(
						{
							x: newMousePos.x,
							y: newMousePos.y,
							z: newMousePos.z
						},
						true
					);
				}
			}
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});

	// Physics update loop - Apply center attraction forces
	useTask((delta) => {
		particles.forEach((particle) => {
			if (!particle.rigidBody) return;

			const pos = particle.rigidBody.translation();
			const vel = particle.rigidBody.linvel();

			// Calculate attraction to center
			const toCenter = new Vector3(-pos.x, -pos.y, -pos.z * 0.3);
			const distanceFromCenter = toCenter.length();

			if (distanceFromCenter > 0) {
				toCenter.normalize();
				const attractionMagnitude = ATTRACTION_FORCE * Math.min(distanceFromCenter, 5);
				toCenter.multiplyScalar(attractionMagnitude);

				// Apply attraction force as impulse
				particle.rigidBody.addForce(
					{
						x: toCenter.x,
						y: toCenter.y,
						z: toCenter.z
					},
					true
				);
			}

			// Apply gentle damping to prevent infinite acceleration
			particle.rigidBody.setLinvel(
				{
					x: vel.x * DAMPING,
					y: vel.y * DAMPING,
					z: vel.z * DAMPING
				},
				true
			);
		});
	});

	// Connection lines calculation
	interface Connection {
		start: Vector3;
		end: Vector3;
		opacity: number;
		distance: number;
	}

	let connections: Connection[] = $state([]);

	useTask(() => {
		const newConnections: Connection[] = [];

		for (let i = 0; i < particles.length; i++) {
			for (let j = i + 1; j < particles.length; j++) {
				if (!particles[i].rigidBody || !particles[j].rigidBody) continue;

				const pos1 = particles[i].rigidBody.translation();
				const pos2 = particles[j].rigidBody.translation();

				const distance = Math.sqrt(
					Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2) + Math.pow(pos1.z - pos2.z, 2)
				);

				if (distance < CONNECTION_DISTANCE) {
					const opacity = Math.pow(1 - distance / CONNECTION_DISTANCE, 1.5);
					newConnections.push({
						start: new Vector3(pos1.x, pos1.y, pos1.z),
						end: new Vector3(pos2.x, pos2.y, pos2.z),
						opacity,
						distance
					});
				}
			}
		}

		connections = newConnections;
	});
</script>

<!-- Invisible Mouse Collider -->
<T.Group position={[mouseWorldPos.x, mouseWorldPos.y, mouseWorldPos.z]}>
	<RigidBody
		bind:rigidBody={mouseColliderBody}
		type="kinematicPosition"
		userData={{ type: 'mouseCollider' }}
	>
		<Collider
			shape="ball"
			args={[MOUSE_REPEL_RADIUS * 0.5]}
			sensor={false}
			restitution={BOUNCE_RESTITUTION}
			friction={0.1}
		/>
		<!-- Visual debug indicator (very subtle) -->
		<T.Mesh>
			<T.SphereGeometry args={[MOUSE_REPEL_RADIUS * 0.5, 16, 8]} />
			<T.MeshBasicMaterial color={0x00ffff} transparent opacity={0.02} wireframe />
		</T.Mesh>
	</RigidBody>
</T.Group>

<!-- Dynamic Physics Particles with Real Collision -->
{#each particles as particle (particle.id)}
	<T.Group position={[particle.position.x, particle.position.y, particle.position.z]}>
		<RigidBody
			bind:rigidBody={particle.rigidBody}
			type="dynamic"
			gravityScale={0}
			linearDamping={0.1}
			angularDamping={0.5}
			userData={{ type: 'particle', id: particle.id }}
		>
			<Collider
				shape="ball"
				args={[PARTICLE_RADIUS]}
				restitution={BOUNCE_RESTITUTION}
				friction={0.3}
				density={0.5}
			/>
			<T.Mesh
				castShadow
				receiveShadow
				geometry={sphereGeometry}
				material={materials[particle.materialIndex]}
			>
				<!-- Enhanced particle glow -->
				<T.PointLight
					intensity={0.8}
					distance={3}
					decay={2}
					color={materials[particle.materialIndex].emissive}
				/>
			</T.Mesh>
		</RigidBody>
	</T.Group>
{/each}

<!-- Enhanced Connection Lines -->
<T.Group>
	{#each connections as connection, index (index)}
		<T.Line
			points={[
				[connection.start.x, connection.start.y, connection.start.z],
				[connection.end.x, connection.end.y, connection.end.z]
			]}
		>
			<T.LineBasicMaterial
				color={new Color().setHSL(0.4 + Math.sin(connection.distance) * 0.2, 0.7, 0.8)}
				transparent
				opacity={connection.opacity * 0.6}
				linewidth={2}
			/>
		</T.Line>
	{/each}
</T.Group>

<!-- Subtle Center Attraction Visual -->
<T.Group>
	<T.Mesh rotation.x={-Math.PI / 2}>
		<T.RingGeometry args={[0.1, 0.2, 32]} />
		<T.MeshBasicMaterial color={0xffffff} transparent opacity={0.1} side={2} />
	</T.Mesh>
	<T.PointLight intensity={0.3} distance={8} decay={2} color={0x00ffff} />
</T.Group>
