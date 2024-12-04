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

<div class="h-screen max-h-screen py-16 px-24">
	<div class="grid grid-cols-2 items-center justify-center">
		<img src={getTree(score)} alt="" />

		<div class="max-w-lg">
			<div class="flex divide-x-[3px] divide-[#1C2E4F] mb-16">
				<p class="text-lg leading-none pe-14">
					<span class="font-bold text-9xl text-[#E5433E]">{score}</span><br />
					collected <br /> ornaments.
				</p>
				<p class="text-lg ps-14 leading-none">
					<span class="font-bold text-9xl text-[#2697E2]"
						>{getEuroForScore(score)}
						<span class="text-8xl">€</span>
					</span><br />
					extra donation <br /> earned
				</p>
			</div>
			<p class="text-lg leading-relaxed mb-4">{getResultText(score)}</p>
			<p class="text-lg leading-relaxed font-bold">
				Virtual Identity wishes you and your loved ones a Merry Christmas and a Happy New Year!
			</p>

			<div class="flex mt-12">
				<div class="flex flex-col gap-4">
					<Button href="/">
						<img src={ReloadIcon} alt="" class="inline-block w-6 h-6 mr-2" />
						Play again
					</Button>
					<!-- <Button variant="secondary">
						<img src={ShareIcon} alt="" class="inline-block w-6 h-6 mr-2" />
						Challenge a friend
					</Button> -->
					<Button click={() => (showModal = true)} variant="secondary">
						<img src={LeaderboardIcon} alt="" class="inline-block w-6 h-6 mr-2" />
						View leaderboard
					</Button>
				</div>
			</div>
		</div>
	</div>
</div>
<Leaderboard leads={leaderboard} bind:show={showModal} />
<UsernameOverlay bind:show={showUsernameOverlay} onSubmit={onUsernameSubmit} />
