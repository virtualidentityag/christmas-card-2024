<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import 'normalize.css';
</script>

<Header></Header>
<main>
	<slot></slot>
</main>

<style>
	:global(body) {
		font-family: 'Roboto', sans-serif;
		margin: 0;
		padding: 0;
		overflow: hidden;
		height: 100vh;
		width: 100vw;
		background-color: #142547;
		background-image: url('/sprites/dd_background.svg');
		position: relative;
	}
</style>
