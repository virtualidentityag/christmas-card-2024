<script>
	import Modal from './Modal.svelte';

	let { leads, show = $bindable() } = $props();
</script>

<Modal bind:show>
	<h2>Leaderboard</h2>

	<ol>
		{#each leads as { username, score }, i}
			<li>
				<span class="place">{i + 1}.</span>
				<span class="name">{username}</span>
				<span class="score">{score}</span>
			</li>
		{/each}
	</ol>
</Modal>

<style>
	h2 {
		font-size: 40px;
		margin-bottom: 40px;
	}
	ol {
		min-width: 612px;
	}
	ol li {
		display: flex;
		line-height: 44px;
		font-size: 16px;
	}
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
