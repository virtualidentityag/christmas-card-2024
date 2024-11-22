<script lang="ts">
	// import Header from '$lib/components/Header.svelte';
	import '../app.css';
</script>

<!-- <Header></Header> -->
<main class="h-screen text-white">
	<div class="fixed -z-10 w-screen h-screen bg-[#142547]">
		<img src="/images/ui/background.png" alt="" class="w-full h-full object-cover" />
		<div
			class="absolute inset-0 bg-gradient-to-b from-[rgba(0,17,43,0.8)] via-[rgba(0,17,43,0.25)] to-[rgba(0,17,43,0.8)]"
		></div>
	</div>
	<slot></slot>
</main>

<!-- <style>
	TODO: Replace by Outfit font
	:global(body) {
		font-family: 'Roboto', sans-serif;
	}
</style> -->
