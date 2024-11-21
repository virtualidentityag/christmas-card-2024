<script lang="ts">
	import Title from '$assets/images/title.png';
	import TreeTitle from '$assets/images/tree_title.png';
	import SockTitle from '$assets/images/sock_title.png';

	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';

	let showModal = $state(false);
</script>

<div class="content">
	<div>
		<span>Virtual Identity</span>
		<span>presents</span>
	</div>
	<div class="title">
		<img src={Title} alt="" />
		<img src={TreeTitle} alt="" class="tree" />
		<img src={SockTitle} alt="" class="sock" />
	</div>
	<p>
		Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat odio et velit neque ad.
		Voluptatibus, quaerat. Corporis esse reprehenderit, voluptatum corrupti cupiditate eveniet
		maiores, quos pariatur, laudantium molestiae nulla eligendi?
	</p>
	<p>
		<b> Sit back </b>
	</p>
	<div class="actions">
		<Button href="/tutorial">Start the game</Button>
		<Button click={() => (showModal = true)} variant="secondary">Highscore Board</Button>
	</div>
</div>
<Modal bind:showModal>
	{#snippet header()}
		<h2>Leaderboard</h2>
	{/snippet}

	<ol class="leaderboard">
		<li>of or relating to modality in logic</li>
		<li>
			containing provisions as to the mode of procedure or the manner of taking effect —used of a
			contract or legacy
		</li>
		<li>of or relating to a musical mode</li>
		<li>of or relating to structure as opposed to substance</li>
		<li>
			of, relating to, or constituting a grammatical form or category characteristically indicating
			predication
		</li>
		<li>of or relating to a statistical mode</li>
	</ol>
</Modal>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		color: white;
	}
	.title {
		position: relative;
	}

	.tree,
	.sock {
		position: absolute;
	}
	.sock {
		top: 60px;
		left: -65px;
	}

	.tree {
		bottom: -30px;
		right: -160px;
	}
</style>
