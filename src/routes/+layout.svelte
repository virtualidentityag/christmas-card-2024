<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import InfoOverlay from '$lib/components/InfoOverlay.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { appState } from '$lib/state/appState.svelte';
	import { page } from '$app/stores';

	import JingleBells from '$assets/sounds/jinglebells.mp3';

	let showInfoOverlay = $state(false);

	const openInfoOverlay = () => {
		showInfoOverlay = true;
	};

	const toggleSound = () => {
		appState.soundEnabled = !appState.soundEnabled;
	};

	const { children } = $props();

	onMount(() => {
		document.onclick = () => {
			const audio = document.querySelector('audio');
			if (audio && audio.paused) {
				audio.play();
			}
		};
		window.addEventListener('blur', () => {
			document.querySelector('audio')?.pause();
		});

		window.onfocus = () => {
			document.querySelector('audio')?.play();
		};
	});
</script>

<audio src={JingleBells} loop volume={appState.soundEnabled ? 1 : 0}></audio>
<Header
	onInfoClick={openInfoOverlay}
	onSoundClick={toggleSound}
	showHome={$page.url.pathname !== '/'}
	soundOn={appState.soundEnabled}
></Header>
<div class="fixed -z-10 w-screen h-screen bg-[#142547]">
	<img src="/images/ui/background.png" alt="" class="w-full h-full object-cover" />
	<div
		class="absolute inset-0 bg-gradient-to-b from-[rgba(0,17,43,0.8)] via-[rgba(0,17,43,0.25)] to-[rgba(0,17,43,0.8)]"
	></div>
</div>
<main class="h-screen text-white pl-10 pr-10">
	{@render children()}
</main>
<InfoOverlay bind:show={showInfoOverlay}></InfoOverlay>

<style>
	:global(body) {
		font-family: 'Outfit', sans-serif;
	}

	main {
		max-width: 100vw;
	}
</style>
