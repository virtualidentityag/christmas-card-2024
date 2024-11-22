<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Tree0 from '$assets/images/tree_0.png';
	import Tree1 from '$assets/images/tree_1.png';
	import Tree2 from '$assets/images/tree_2.png';
	import type { PageData } from './$types';
	import Modal from '$lib/components/Modal.svelte';

	const getTree = (score: number) => {
		if (score > 200) {
			return Tree2;
		}
		if (score > 100) {
			return Tree1;
		}
		return Tree0;
	};

	const getResultText = (score: number) => {
		if (score > 200) {
			return 'Whoa, look at you go! Your awesome skills earned you a spot on the leaderboard, and thanks to you, we’re adding more to this years charity . Way to spread the holiday cheer!';
		}
		if (score > 100) {
			return "Nice job! You grabbed enough deco items to add a little extra to this years' charity — your holiday spirit is making a difference! Keep it up, and maybe next time, the leaderboard will be calling your name!";
		}
		return "Aw, so close! You didn't grab enough deco items this time, but no worries—your effort still brought some festive cheer. Give it another go, and let's see if we can add some extra sparkle to the donations.";
	};

	const calculateDonation = (score: number) => {
		if (score > 200) {
			return 2;
		}
		if (score > 100) {
			return 1;
		}
		return 0;
	};

	let showModal = $state(false);
	let { data }: { data: PageData } = $props();
</script>

<div class="h-screen max-h-screen py-16 px-24">
	<div class="grid grid-cols-2 items-center justify-center">
		<img src={getTree(data.score)} alt="" />

		<div class="max-w-lg">
			<div class="flex divide-x-[3px] divide-[#1C2E4F] mb-16">
				<p class="text-lg leading-none pe-14">
					<span class="font-bold text-9xl text-[#E5433E]">{data.score}</span><br />
					collected <br /> ornaments.
				</p>
				<p class="text-lg ps-14 leading-none">
					<span class="font-bold text-9xl text-[#2697E2]"
						>{calculateDonation(data.score)}
						<span class="text-8xl">€</span>
					</span><br />
					extra donation <br /> earned
				</p>
			</div>
			<p class="text-lg leading-relaxed mb-4">{getResultText(data.score)}</p>
			<p class="text-lg leading-relaxed font-bold">
				We wish you and your loved ones a wonderful Christmas and a Happy New Year!
			</p>

			<div class="flex mt-12">
				<div class="flex flex-col gap-4">
					<Button href="/">Play again</Button>
					<Button variant="secondary">Beat my highscore</Button>
					<Button click={() => (showModal = true)} variant="secondary">View leaderboard</Button>
				</div>
			</div>
		</div>
	</div>
</div>
<Modal bind:showModal>
	{#snippet header()}
		<h2>Leaderboard</h2>
	{/snippet}

	<ol class="leaderboard">
		{#each data.leads as { username, score }, i}
			<li>
				<span>{username}</span>
				<span>{score}</span>
			</li>
		{/each}
	</ol>
</Modal>

<style>
	.content {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 1rem;
	}

	.score {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.actions {
		display: inline-flex;
		flex-direction: column;
	}
</style>
