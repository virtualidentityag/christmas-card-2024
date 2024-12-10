<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Tree0 from '$assets/images/tree_0.png';
	import Tree1 from '$assets/images/tree_1.png';
	import LeaderboardIcon from '$assets/images/icons/leaderboard.png';
	import ReloadIcon from '$assets/images/icons/reload.png';
	import ShareIcon from '$assets/images/icons/share.png';
	import type { PageData } from './$types';
	import Tree2 from '$assets/images/tree_2.png';
	import Leaderboard from '$lib/components/Leaderboard.svelte';
	import { getEuroForScore } from '$lib/util/getEuroForScore';
	import UsernameOverlay from '$lib/components/UsernameOverlay.svelte';
	import { appState } from '$lib/state/appState.svelte';

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
			return `Wow, look at you go! Your skills have earned you a spot on the leaderboard, and thanks to you, this year's charity is getting an extra boost. Way to spread the holiday cheer!`;
		}
		if (score > 100) {
			return `Great job! You caught enough decorations to give this year's charity a little boost - your holiday spirit is making a real difference! Keep it up and maybe next time you'll land a spot on the leaderboard.`;
		}
		return `So close! You didn't grab enough decorations this time, but your effort still spread some festive cheer! Give it another go and let's add some extra sparkle to the donations.`;
	};

	let showModal = $state(false);
	let showUsernameOverlay = $state(true);
	let { data }: { data: PageData } = $props();
	let leaderboard = $state(data.leads);
	const score = appState.score;
	const onUsernameSubmit = (leaderboardUpdate) => {
		showUsernameOverlay = false;
		leaderboard = leaderboardUpdate;
	};
</script>

<div class="max-h-screen py-12">
	<div
		class="grid grid-cols-2 grid-rows-3 auto-rows-auto md:grid-rows-1 items-center justify-center [grid-template-areas:'tree_result''text_text''actions_actions'] md:[grid-template-areas:'tree_result''tree_text''tree_actions']"
	>
		<img src={getTree(score)} alt="" class="h-5/6 [grid-area:tree]" />

		<!-- <div class="max-w-lg pt-6 md:pt-0"> -->
		<div
			class="flex flex-col md:flex-row md:divide-x-[3px] divide-[#1C2E4F] mb-6 md:mb-16 [grid-area:result]"
		>
			<p class="text-lg leading-none pe-6 md:pe-14">
				<span class="font-bold text-3xl md:text-9xl text-[#E5433E]">{score}</span><br />
				collected <br /> ornaments.
			</p>
			<p class="text-lg mt-6 md:ps-6 md:ps-14 md:mt-0 leading-none">
				<span class="font-bold text-3xl md:text-9xl text-[#2697E2]"
					>{getEuroForScore(score)}
					<span class="md:text-8xl">€</span>
				</span><br />
				extra donation <br /> earned
			</p>
		</div>
		<div class="[grid-area:text]">
			<p class="md:text-lg leading-relaxed mb-4">{getResultText(score)}</p>
			<p class="md:text-lg leading-relaxed font-bold">
				Virtual Identity wishes you and your loved ones a Merry Christmas and a Happy New Year!
			</p>
		</div>

		<div class="flex justify-center mt-6 md:mt-12 [grid-area:actions]">
			<div class="flex flex-col gap-4">
				<Button href="/" autofocus>
					<img src={ReloadIcon} alt="" class="inline-block w-6 h-6 mr-2" />
					Play again
				</Button>
				<Button variant="secondary">
					<img src={ShareIcon} alt="" class="inline-block w-6 h-6 mr-2" />
					Challenge a friend
				</Button>
				<Button click={() => (showModal = true)} variant="secondary">
					<img src={LeaderboardIcon} alt="" class="inline-block w-6 h-6 mr-2" />
					View leaderboard
				</Button>
			</div>
		</div>
		<!-- </div> -->
	</div>
</div>
<Leaderboard leads={leaderboard} bind:show={showModal} />
<UsernameOverlay bind:show={showUsernameOverlay} onSubmit={onUsernameSubmit} />
