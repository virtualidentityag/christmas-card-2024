<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import InfoOverlay from '$lib/components/InfoOverlay.svelte';
	import { setContext } from 'svelte';
	import '../app.css';
	import { appState } from '$lib/state/appState.svelte';

	let showInfoOverlay = $state(false);

	const openInfoOverlay = () => {
		showInfoOverlay = true;
	};

	const toggleSound = () => {
		appState.soundEnabled = !appState.soundEnabled;
	};

	const { children } = $props();
</script>

<Header onInfoClick={openInfoOverlay} onSoundClick={toggleSound}></Header>
<div class="fixed -z-10 w-screen h-screen bg-[#142547]">
	<img src="/images/ui/background.png" alt="" class="w-full h-full object-cover" />
	<div
		class="absolute inset-0 bg-gradient-to-b from-[rgba(0,17,43,0.8)] via-[rgba(0,17,43,0.25)] to-[rgba(0,17,43,0.8)]"
	></div>
</div>
<main class="h-screen text-white">
	{@render children()}
</main>
<InfoOverlay bind:show={showInfoOverlay}></InfoOverlay>

<style>
	:global(body) {
		font-family: 'Outfit', sans-serif;
	}
</style>
