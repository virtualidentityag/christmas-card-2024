<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import InfoOverlay from '$lib/components/InfoOverlay.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { appState } from '$lib/state/appState.svelte';
	import { page } from '$app/stores';

	import JingleBells from '$assets/sounds/jinglebells.mp3';
	import TermsOverlay from '$lib/components/TermsOverlay.svelte';

	let showInfoOverlay = $state(false);
	let showTermsOverlay = $state(false);

	const openInfoOverlay = () => {
		showInfoOverlay = true;
	};

	const openTermsOverlay = () => {
		showTermsOverlay = true;
	};

	const toggleSound = () => {
		console.log('toggleSound');

		appState.soundEnabled = !appState.soundEnabled;
		const audio = document.querySelector('audio');
		if (audio) {
			audio.muted = !appState.soundEnabled;
		}
	};

	const { children } = $props();

	onMount(() => {
		window.scrollTo(1, 0);
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

<audio src={JingleBells} loop></audio>
<Header
	onInfoClick={openInfoOverlay}
	onSoundClick={toggleSound}
	showHome={$page.url.pathname !== '/'}
	logoBlack={$page.url.pathname === '/game'}
	soundOn={appState.soundEnabled}
></Header>
<div class="fixed -z-10 w-screen h-screen bg-[#142547]">
	<img src="/images/ui/background.png" alt="" class="w-full h-full object-cover" />
	<div
		class="absolute inset-0 bg-gradient-to-b from-[rgba(0,17,43,0.8)] via-[rgba(0,17,43,0.25)] to-[rgba(0,17,43,0.8)]"
	></div>
</div>
<main class="h-screen text-white pl-10 pr-10 flex items-center justify-center">
	{@render children()}
</main>
<footer
	class="mx-auto flex justify-center md:justify-end max-w-screen-lg w-full fixed bottom-0 px-6"
>
	<nav class="inline-block text-white bg-[#1C2B40CC] rounded-t-[8px] px-4 pt-2 pb-3">
		<a href="https://www.virtual-identity.com/imprint/" target="_blank" class="pr-6">Imprint</a>
		<a href="#" onclick={openTermsOverlay} class="pr-6">Terms of Use</a>
		<a href="https://www.virtual-identity.com/privacy-policy/#online-games" target="_blank"
			>Privacy</a
		>
	</nav>
</footer>
<InfoOverlay bind:show={showInfoOverlay}></InfoOverlay>
<TermsOverlay bind:show={showTermsOverlay}></TermsOverlay>

<style>
	:global(body) {
		font-family: 'Outfit', sans-serif;
	}

	main {
		max-width: 100vw;
	}
</style>
