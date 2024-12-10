<script>
	import Modal from './Modal.svelte';

	let { leads, show = $bindable() } = $props();
</script>

<Modal bind:show>
	<h2 class="text-3xl mb-6 md:text-6xl md:mb-12">Leaderboard</h2>

	<ol class="max-h-[50vh] overflow-scroll">
		{#each leads as { username, score }, i}
			<li class="flex text-base leading-10">
				<span class="place">{i + 1}.</span>
				<span class="name">{username}</span>
				<span class="score">{score}</span>
			</li>
		{/each}
	</ol>
</Modal>

<style>
	.place {
		width: 40px;
	}
	.score {
		flex-grow: 1;
		text-align: right;
	}
	ol li:first-child {
		color: #fcb65b;
	}
	ol li:nth-child(2) {
		color: #e5433e;
	}
	ol li:nth-child(3) {
		color: #2697e2;
	}
</style>
