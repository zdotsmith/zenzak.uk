<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let scrollY = 0;
	let innerHeight = 0;
	let innerWidth = 0;
	let heroSection;
	let mouseX = 0;
	let mouseY = 0;
	let lightingMode = 'day';

	// Scroll progress calculations
	$: heroProgress = Math.min(scrollY / innerHeight, 1);
	$: parallaxProgress = Math.max(0, Math.min((scrollY - innerHeight) / innerHeight, 1));
	$: exhibit1Progress = Math.max(0, Math.min((scrollY - innerHeight * 2) / innerHeight, 1));

	function handleMouseMove(event) {
		if (browser) {
			mouseX = (event.clientX / innerWidth - 0.5) * 2;
			mouseY = (event.clientY / innerHeight - 0.5) * 2;
		}
	}

	function setLighting(mode) {
		lightingMode = mode;
	}

	onMount(() => {
		const handleScroll = () => (scrollY = window.scrollY);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<svelte:window bind:scrollY bind:innerHeight bind:innerWidth on:mousemove={handleMouseMove} />

<main class="relative">
	<!-- Hero Section: The 3D Workshop -->
	<section
		bind:this={heroSection}
		class="hero-section relative flex h-screen items-center justify-center overflow-hidden"
	>
		<!-- 3D Crystalline Object Placeholder -->
		<div
			class="crystalline-object"
			style="
transform: 
rotateY({scrollY * 0.2}deg) 
rotateX({mouseY * 10}deg) 
rotateZ({mouseX * 5}deg)
translateZ({-scrollY * 2}px);
opacity: {1 - heroProgress * 0.8};
"
		>
			<div class="crystal-core">
				<div class="crystal-face crystal-face-1"></div>
				<div class="crystal-face crystal-face-2"></div>
				<div class="crystal-face crystal-face-3"></div>
				<div class="crystal-face crystal-face-4"></div>
			</div>
		</div>

		<!-- Zoom transition overlay -->
		<div
			class="zoom-overlay"
			style="opacity: {heroProgress}; transform: scale({1 + heroProgress * 2});"
		></div>

		<div class="hero-content z-10 text-center" style="opacity: {1 - heroProgress};">
			<h1 class="mb-6 text-6xl font-semibold text-white">The Interactive Journey</h1>
			<p class="mx-auto max-w-2xl text-xl text-white/80">
				A scroll-based narrative through the future of web experiences
			</p>
		</div>
	</section>

	<!-- Parallax Transition: Entering the Gallery -->
	<section class="parallax-section relative h-screen overflow-hidden">
		<!-- Background Layer -->
		<div
			class="parallax-bg absolute inset-0 bg-gradient-to-b from-slate-900 to-black"
			style="transform: translateY({parallaxProgress * -50}px);"
		></div>

		<!-- Mid-ground: Animated SVG Constellations -->
		<div
			class="parallax-mid absolute inset-0"
			style="transform: translateY({parallaxProgress * -100}px);"
		>
			{#each Array(12) as _, i}
				<div
					class="constellation-dot"
					style="
left: {(i * 83.7) % 100}%;
top: {(i * 47.3 + 20) % 80}%;
animation-delay: {i * 0.5}s;
opacity: {parallaxProgress};
"
				></div>
			{/each}
		</div>

		<!-- Foreground: Larger SVG Shapes -->
		<div
			class="parallax-fg absolute inset-0"
			style="transform: translateY({parallaxProgress * -200}px);"
		>
			<div class="geometric-shape shape-1" style="opacity: {parallaxProgress};"></div>
			<div class="geometric-shape shape-2" style="opacity: {parallaxProgress};"></div>
			<div class="geometric-shape shape-3" style="opacity: {parallaxProgress};"></div>
		</div>

		<div class="section-content z-10 flex h-full items-center justify-center">
			<div class="text-center">
				<h2 class="mb-4 text-4xl font-semibold text-white">Entering the Digital Gallery</h2>
				<p class="mx-auto max-w-xl text-lg text-white/70">
					Experience depth through layers of interactive elements
				</p>
			</div>
		</div>
	</section>

	<!-- Exhibit 1: The Floating Artifact -->
	<section class="exhibit-section bg-slate-800 py-20">
		<div class="container mx-auto max-w-6xl px-6">
			<div class="grid items-center gap-12 lg:grid-cols-2">
				<div class="exhibit-content">
					<h3 class="mb-6 text-3xl font-semibold text-white">The Floating Artifact</h3>
					<p class="mb-8 text-lg text-white/80">
						A 3D model showcasing the future of product visualization. Interactive elements reveal
						hidden details and specifications.
					</p>

					<!-- Animated SVG Stats -->
					<div class="stats-container grid grid-cols-2 gap-4">
						<div class="stat-item">
							<div class="stat-icon">
								<svg class="h-8 w-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
									<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</div>
							<div>
								<div class="text-2xl font-bold text-white">360°</div>
								<div class="text-sm text-white/60">Interactive View</div>
							</div>
						</div>
						<div class="stat-item">
							<div class="stat-icon">
								<svg class="h-8 w-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
									<path
										d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"
									/>
								</svg>
							</div>
							<div>
								<div class="text-2xl font-bold text-white">4K</div>
								<div class="text-sm text-white/60">Resolution</div>
							</div>
						</div>
					</div>
				</div>

				<div class="exhibit-3d-container">
					<!-- 3D Model Placeholder -->
					<div
						class="floating-artifact"
						style="
transform: 
rotateY({scrollY * 0.1}deg) 
translateY({Math.sin(scrollY * 0.01) * 20}px);
"
					>
						<div class="artifact-model">
							<div class="artifact-ring artifact-ring-1"></div>
							<div class="artifact-ring artifact-ring-2"></div>
							<div class="artifact-ring artifact-ring-3"></div>
							<div class="artifact-core"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- SVG Animation Interlude -->
	<section class="svg-interlude overflow-hidden bg-black py-20">
		<div class="container mx-auto px-6">
			<div class="mb-12 text-center">
				<h3 class="mb-4 text-4xl font-semibold text-white">Morphing Into the Future</h3>
			</div>

			<!-- Animated SVG Pattern -->
			<div class="svg-animation-container">
				<svg viewBox="0 0 800 400" class="mx-auto h-96 w-full">
					<!-- Geometric pattern that draws and morphs -->
					<defs>
						<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
							<stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
						</linearGradient>
					</defs>

					<path
						class="morphing-path"
						fill="none"
						stroke="url(#grad1)"
						stroke-width="2"
						d="M 100 200 L 200 100 L 300 200 L 400 100 L 500 200 L 600 100 L 700 200"
					/>

					<circle
						class="pulse-circle"
						cx="400"
						cy="200"
						r="50"
						fill="none"
						stroke="url(#grad1)"
						stroke-width="2"
					/>
				</svg>
			</div>
		</div>
	</section>

	<!-- Exhibit 2: Architectural Visualization -->
	<section class="exhibit-section bg-slate-900 py-20">
		<div class="container mx-auto max-w-6xl px-6">
			<div class="mb-16 text-center">
				<h3 class="mb-6 text-4xl font-semibold text-white">Architectural Visualization</h3>
				<p class="mx-auto max-w-3xl text-lg text-white/70">
					Experience spaces before they exist. Interactive lighting controls and material selection
					bring architectural concepts to life.
				</p>
			</div>

			<div class="architecture-container">
				<!-- 3D Building Placeholder -->
				<div
					class="building-3d"
					class:day={lightingMode === 'day'}
					class:sunset={lightingMode === 'sunset'}
					class:night={lightingMode === 'night'}
				>
					<div class="building-structure">
						<div class="building-floor building-floor-1"></div>
						<div class="building-floor building-floor-2"></div>
						<div class="building-floor building-floor-3"></div>
						<div class="building-roof"></div>
					</div>
				</div>

				<!-- Interactive Controls -->
				<div class="lighting-controls mt-8 flex justify-center gap-4">
					<button
						class="control-btn"
						class:active={lightingMode === 'day'}
						on:click={() => setLighting('day')}>Day</button
					>
					<button
						class="control-btn"
						class:active={lightingMode === 'sunset'}
						on:click={() => setLighting('sunset')}>Sunset</button
					>
					<button
						class="control-btn"
						class:active={lightingMode === 'night'}
						on:click={() => setLighting('night')}>Night</button
					>
				</div>
			</div>
		</div>
	</section>

	<!-- Under the Hood Section -->
	<section class="under-hood-section bg-slate-800 py-20">
		<div class="container mx-auto max-w-4xl px-6">
			<div class="mb-16 text-center">
				<h3 class="mb-6 text-4xl font-semibold text-white">Under the Hood</h3>
				<p class="text-lg text-white/70">
					The technology and process behind immersive web experiences
				</p>
			</div>

			<div class="process-diagram">
				<!-- Central Brain/Machine SVG -->
				<div class="central-processor">
					<svg viewBox="0 0 200 200" class="mx-auto h-48 w-48">
						<circle
							cx="100"
							cy="100"
							r="80"
							fill="none"
							stroke="#3b82f6"
							stroke-width="2"
							class="processor-ring"
						/>
						<circle
							cx="100"
							cy="100"
							r="60"
							fill="none"
							stroke="#8b5cf6"
							stroke-width="2"
							class="processor-core"
						/>
						<circle cx="100" cy="100" r="30" fill="#3b82f6" opacity="0.3" />
					</svg>
				</div>

				<!-- Process Steps -->
				<div class="process-steps mt-12 grid gap-8 md:grid-cols-3">
					<div class="process-step text-center">
						<div
							class="step-icon mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20"
						>
							<svg class="h-8 w-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
								<path
									d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 4l-6 4-6-4V6l6 4 6-4v2z"
								/>
							</svg>
						</div>
						<h4 class="mb-2 text-xl font-semibold text-white">Design</h4>
						<p class="text-white/60">3D modeling and conceptualization</p>
					</div>

					<div class="process-step text-center">
						<div
							class="step-icon mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20"
						>
							<svg class="h-8 w-8 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
								<path
									d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
								/>
							</svg>
						</div>
						<h4 class="mb-2 text-xl font-semibold text-white">Develop</h4>
						<p class="text-white/60">Web integration and optimization</p>
					</div>

					<div class="process-step text-center">
						<div
							class="step-icon mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20"
						>
							<svg class="h-8 w-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
								<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<h4 class="mb-2 text-xl font-semibold text-white">Deploy</h4>
						<p class="text-white/60">Performance-optimized delivery</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Contact Section with Subtle 3D -->
	<section class="contact-section relative bg-black py-20">
		<!-- Subtle background 3D object -->
		<div class="background-crystal">
			<div
				class="crystal-bg"
				style="
transform: 
rotateY({scrollY * 0.05}deg) 
rotateX({mouseY * 2}deg);
opacity: 0.1;
"
			>
				<div class="crystal-bg-core"></div>
			</div>
		</div>

		<div class="relative z-10 container mx-auto max-w-2xl px-6">
			<div class="text-center">
				<h3 class="mb-6 text-4xl font-semibold text-white">Ready to Build Something Amazing?</h3>
				<p class="mb-8 text-lg text-white/70">
					Let's create your next immersive web experience together.
				</p>

				<div class="contact-form space-y-6">
					<input
						type="text"
						placeholder="Your Name"
						class="w-full rounded-lg border border-white/20 bg-white/10 p-4 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
					/>
					<input
						type="email"
						placeholder="Your Email"
						class="w-full rounded-lg border border-white/20 bg-white/10 p-4 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
					/>
					<textarea
						placeholder="Tell us about your project"
						rows="4"
						class="w-full resize-none rounded-lg border border-white/20 bg-white/10 p-4 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
					></textarea>
					<button
						class="w-full rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition-colors hover:bg-blue-700"
					>
						Start Your Journey
					</button>
				</div>
			</div>
		</div>
	</section>
</main>

<style>
	/* Hero Section Styles */
	.hero-section {
		background: radial-gradient(ellipse at center, #1e293b 0%, #000 70%);
		perspective: 1000px;
	}

	.crystalline-object {
		transform-style: preserve-3d;
	}

	.crystal-core {
		width: 200px;
		height: 200px;
		position: relative;
		transform-style: preserve-3d;
		animation: float 6s ease-in-out infinite;
	}

	.crystal-face {
		position: absolute;
		width: 100%;
		height: 100%;
		background: linear-gradient(45deg, #3b82f6, #8b5cf6);
		opacity: 0.8;
		border: 2px solid rgba(255, 255, 255, 0.3);
	}

	.crystal-face-1 {
		transform: rotateY(0deg) translateZ(100px);
	}
	.crystal-face-2 {
		transform: rotateY(90deg) translateZ(100px);
	}
	.crystal-face-3 {
		transform: rotateY(180deg) translateZ(100px);
	}
	.crystal-face-4 {
		transform: rotateY(270deg) translateZ(100px);
	}

	.zoom-overlay {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle, transparent 0%, #000 80%);
		pointer-events: none;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-20px);
		}
	}

	/* Parallax Section Styles */
	.constellation-dot {
		position: absolute;
		width: 4px;
		height: 4px;
		background: #3b82f6;
		border-radius: 50%;
		animation: twinkle 3s ease-in-out infinite;
	}

	@keyframes twinkle {
		0%,
		100% {
			opacity: 0.3;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.2);
		}
	}

	.geometric-shape {
		position: absolute;
		background: linear-gradient(45deg, #3b82f6, #8b5cf6);
		opacity: 0.6;
	}

	.shape-1 {
		width: 80px;
		height: 80px;
		top: 20%;
		left: 10%;
		transform: rotate(45deg);
		animation: spin 15s linear infinite;
	}

	.shape-2 {
		width: 60px;
		height: 60px;
		top: 60%;
		right: 15%;
		border-radius: 50%;
		animation: pulse 4s ease-in-out infinite;
	}

	.shape-3 {
		width: 100px;
		height: 40px;
		bottom: 30%;
		left: 60%;
		transform: skew(-15deg);
		animation: slide 8s ease-in-out infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(45deg);
		}
		to {
			transform: rotate(405deg);
		}
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
	}

	@keyframes slide {
		0%,
		100% {
			transform: skew(-15deg) translateX(0);
		}
		50% {
			transform: skew(-15deg) translateX(20px);
		}
	}

	/* Exhibit Styles */
	.stat-item {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 16px;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.floating-artifact {
		width: 300px;
		height: 300px;
		position: relative;
		margin: 0 auto;
		transform-style: preserve-3d;
		perspective: 1000px;
	}

	.artifact-model {
		width: 100%;
		height: 100%;
		position: relative;
		transform-style: preserve-3d;
	}

	.artifact-ring {
		position: absolute;
		border: 3px solid;
		border-radius: 50%;
		animation: rotate-ring 10s linear infinite;
	}

	.artifact-ring-1 {
		width: 100%;
		height: 100%;
		border-color: #3b82f6;
		animation-duration: 8s;
	}

	.artifact-ring-2 {
		width: 70%;
		height: 70%;
		top: 15%;
		left: 15%;
		border-color: #8b5cf6;
		animation-duration: 12s;
		animation-direction: reverse;
	}

	.artifact-ring-3 {
		width: 40%;
		height: 40%;
		top: 30%;
		left: 30%;
		border-color: #06b6d4;
		animation-duration: 6s;
	}

	.artifact-core {
		position: absolute;
		width: 20%;
		height: 20%;
		top: 40%;
		left: 40%;
		background: radial-gradient(circle, #3b82f6, #8b5cf6);
		border-radius: 50%;
		animation: glow 3s ease-in-out infinite alternate;
	}

	@keyframes rotate-ring {
		from {
			transform: rotateZ(0deg);
		}
		to {
			transform: rotateZ(360deg);
		}
	}

	@keyframes glow {
		from {
			box-shadow: 0 0 20px #3b82f6;
		}
		to {
			box-shadow:
				0 0 40px #8b5cf6,
				0 0 60px #06b6d4;
		}
	}

	/* SVG Animation Styles */
	.morphing-path {
		stroke-dasharray: 1000;
		stroke-dashoffset: 1000;
		animation: draw 4s ease-in-out infinite;
	}

	.pulse-circle {
		animation: pulse-grow 3s ease-in-out infinite;
		transform-origin: center;
	}

	@keyframes draw {
		0% {
			stroke-dashoffset: 1000;
		}
		50% {
			stroke-dashoffset: 0;
		}
		100% {
			stroke-dashoffset: -1000;
		}
	}

	@keyframes pulse-grow {
		0%,
		100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.2);
			opacity: 0.7;
		}
	}

	/* Architecture Section Styles */
	.building-3d {
		width: 400px;
		height: 300px;
		margin: 0 auto;
		perspective: 1000px;
	}

	.building-structure {
		width: 100%;
		height: 100%;
		position: relative;
		transform-style: preserve-3d;
		transform: rotateX(-10deg) rotateY(15deg);
	}

	.building-floor {
		position: absolute;
		width: 100%;
		height: 60px;
		background: linear-gradient(135deg, #475569, #334155);
		border: 2px solid rgba(255, 255, 255, 0.2);
	}

	.building-floor-1 {
		bottom: 0;
	}
	.building-floor-2 {
		bottom: 60px;
	}
	.building-floor-3 {
		bottom: 120px;
	}

	.building-roof {
		position: absolute;
		top: 0;
		width: 100%;
		height: 40px;
		background: linear-gradient(135deg, #1e293b, #0f172a);
		border: 2px solid rgba(255, 255, 255, 0.3);
	}

	/* Building Lighting Modes */
	.building-3d.day .building-floor {
		background: linear-gradient(135deg, #94a3b8, #64748b);
		border-color: rgba(255, 255, 255, 0.4);
	}

	.building-3d.day .building-roof {
		background: linear-gradient(135deg, #475569, #334155);
		border-color: rgba(255, 255, 255, 0.4);
	}

	.building-3d.sunset .building-floor {
		background: linear-gradient(135deg, #f97316, #ea580c);
		border-color: rgba(255, 200, 100, 0.6);
	}

	.building-3d.sunset .building-roof {
		background: linear-gradient(135deg, #dc2626, #b91c1c);
		border-color: rgba(255, 200, 100, 0.6);
	}

	.building-3d.night .building-floor {
		background: linear-gradient(135deg, #1e293b, #0f172a);
		border-color: rgba(100, 200, 255, 0.3);
		box-shadow: 0 0 10px rgba(100, 200, 255, 0.2);
	}

	.building-3d.night .building-roof {
		background: linear-gradient(135deg, #0f172a, #020617);
		border-color: rgba(100, 200, 255, 0.4);
		box-shadow: 0 0 15px rgba(100, 200, 255, 0.3);
	}

	.control-btn {
		padding: 8px 16px;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 6px;
		color: white;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.control-btn:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.control-btn.active {
		background: #3b82f6;
		border-color: #3b82f6;
	}

	/* Process Animation Styles */
	.processor-ring {
		animation: rotate-slow 20s linear infinite;
		transform-origin: center;
	}

	.processor-core {
		animation: rotate-slow 15s linear infinite reverse;
		transform-origin: center;
	}

	@keyframes rotate-slow {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	/* Background Crystal Styles */
	.background-crystal {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 400px;
		height: 400px;
		pointer-events: none;
	}

	.crystal-bg {
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
	}

	.crystal-bg-core {
		width: 100%;
		height: 100%;
		background: radial-gradient(circle, #3b82f6, transparent);
		border-radius: 50%;
		animation: pulse-subtle 8s ease-in-out infinite;
	}

	@keyframes pulse-subtle {
		0%,
		100% {
			opacity: 0.1;
			transform: scale(1);
		}
		50% {
			opacity: 0.3;
			transform: scale(1.1);
		}
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.crystal-core {
			width: 150px;
			height: 150px;
		}

		.floating-artifact {
			width: 200px;
			height: 200px;
		}

		.building-3d {
			width: 300px;
			height: 200px;
		}

		.hero-content h1 {
			font-size: 3rem;
		}
	}
</style>
