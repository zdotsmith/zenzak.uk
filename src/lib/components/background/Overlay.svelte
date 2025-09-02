<script>
	import { shrinkSpheres, pushSpheres, sphereControlState } from '$lib/stores/sphereControls.js';

	let showControls = $state(false);
</script>

<div class="pointer-events-none fixed inset-0 flex h-screen w-screen flex-col p-4 sm:p-6 md:p-8">
	<!-- Sphere Control Button - Top Right -->
	<div
		class="pointer-events-auto absolute top-4 right-4 z-30 sm:top-6 sm:right-6 md:top-8 md:right-8"
	>
		<div class="relative">
			<button
				onclick={() => (showControls = !showControls)}
				class="flex min-h-[44px] min-w-[44px] items-center justify-center
				       border border-white/30 bg-black/50 p-3 text-white
				       backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-black/70
				       {showControls ? 'border-white/50 bg-black/70' : ''}"
				title="Sphere Controls"
				aria-label="Toggle sphere controls menu"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<circle cx="12" cy="12" r="3"></circle>
					<circle cx="12" cy="2" r="1"></circle>
					<circle cx="12" cy="22" r="1"></circle>
					<circle cx="2" cy="12" r="1"></circle>
					<circle cx="22" cy="12" r="1"></circle>
				</svg>
			</button>

			{#if showControls}
				<div
					class="absolute top-full right-0 mt-2 min-w-[180px] border border-white/30 bg-black/80
				           py-2 backdrop-blur-sm transition-all duration-200"
				>
					<button
						onclick={() => {
							shrinkSpheres();
							showControls = false;
						}}
						class="flex min-h-[44px] w-full items-center space-x-2 px-4 py-3
						       text-left text-sm text-white transition-colors hover:bg-white/10
						       {$sphereControlState.mode === 'shrunk' ? 'bg-white/20' : ''}"
					>
						<svg
							class="h-4 w-4 flex-shrink-0"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M20 12H4m16 0l-4-4m4 4l-4 4"
								transform="scale(0.7 0.7) translate(3.5 3.5)"
							></path>
						</svg>
						<span
							>{$sphereControlState.mode === 'shrunk' ? 'Restore Spheres' : 'Shrink Spheres'}</span
						>
					</button>
					<button
						onclick={() => {
							pushSpheres();
							showControls = false;
						}}
						class="flex min-h-[44px] w-full items-center space-x-2 px-4 py-3
						       text-left text-sm text-white transition-colors hover:bg-white/10
						       {$sphereControlState.isAnimating && $sphereControlState.mode === 'pushed'
							? 'bg-white/20'
							: ''}"
						disabled={$sphereControlState.isAnimating}
					>
						<svg
							class="h-4 w-4 flex-shrink-0"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 8l4-4m0 0l4 4m-4-4v12m8-8l4 4m-4 0l-4-4m4 4V4"
							></path>
						</svg>
						<span>Push Away</span>
					</button>
				</div>
			{/if}
		</div>
	</div>

	<!-- Header Spacer -->
	<div class="font-antonio mt-16 text-2xl font-bold tracking-tighter sm:mt-20 sm:text-3xl">
		&nbsp;
	</div>

	<div class="flex-grow"></div>

	<!-- Main Title Spacer -->
	<div class="w-full">
		<div class="font-antonio text-[clamp(3.5rem,16vw,12rem)] leading-none font-bold">&nbsp;</div>
	</div>

	<!-- Call to Action Section -->
	<div class="pointer-events-auto mt-3 w-full max-w-md sm:mt-4 sm:max-w-lg">
		<!-- Description Spacer -->
		<div class="text-sm leading-relaxed text-transparent sm:text-base md:text-lg">&nbsp;</div>

		<div class="mt-32 flex items-center space-x-6 sm:mt-40">
			<a
				href="/contact"
				class="flex min-h-[44px] items-center justify-center border border-white px-5 py-3 text-base
				       text-white transition-colors duration-300 hover:bg-white
				       hover:text-black sm:px-6 sm:py-3 sm:text-lg"
			>
				Start a Project
			</a>
		</div>
	</div>

	<div class="flex-grow"></div>

	<!-- Footer Section -->
	<footer class="pointer-events-auto flex w-full items-end justify-between">
		<div class="text-xs whitespace-nowrap sm:text-sm">&nbsp;</div>

		<a
			href="https://github.com/zenzak-uk"
			target="_blank"
			rel="noopener noreferrer"
			class="flex min-h-[44px] items-center justify-center px-2 py-2
			       text-xs text-neutral-400 transition-colors hover:text-white hover:underline sm:text-sm"
		>
			Github
		</a>
	</footer>
</div>
