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
	import ShareOverlay from '$lib/components/ShareOverlay.svelte';
	import { onMount } from 'svelte';

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
		const messages = [
			`So close! You didn't grab enough decorations this time, but your effort still spread some festive cheer! Give it another go and let's add some extra sparkle to the donations.`,
			`Great job! You caught enough decorations to give this year's charity a little boost - your holiday spirit is making a real difference! Keep it up and maybe next time you'll land a spot on the leaderboard.`,
			`Wow, look at you go! Your skills have earned you a spot on the leaderboard, and thanks to you, this year's charity is getting an extra boost. Way to spread the holiday cheer!`
		];

		const goalReachedMessages = [
			`Almost there! You didn't quite catch enough decorations this time, but you're getting closer. Try again and see if you can reach the leaderboard next round!`,
			`Nice job! You've collected a decent number of decorations, just a little more and you'll land a spot on the leaderboard!`,
			`Great job! You've good chances to land on the leaderboard and shown off your decorative skills. Can you push your score even higher?`
		];

		if (appState.goalReached) {
			if (score > 200) {
				return goalReachedMessages[2];
			}
			if (score > 100) {
				return goalReachedMessages[1];
			}
			return goalReachedMessages[0];
		}

		if (score > 200) {
			return messages[2];
		}
		if (score > 100) {
			return messages[1];
		}
		return messages[0];
	};

	let { data }: { data: PageData } = $props();
	let leaderboard = $state(data.leads);
	const score = appState.score;
	const isInTop25 =
		leaderboard.length < 25 || leaderboard.slice(0, 25).some((lead) => lead.score < score);
	let showUsernameOverlay = $state(isInTop25);
	let showModal = $state(false);
	let showShare = $state(false);
	const onUsernameSubmit = (leaderboardUpdate) => {
		showUsernameOverlay = false;
		leaderboard = leaderboardUpdate;
	};

	const share = async () => {
		if (navigator.share) {
			await navigator.share({
				title: 'Virtual Identity - Deco Dash',
				text: `I just collected ${score} ornaments and earned ${getEuroForScore(score)}€ for charity! Try to beat my score!`,
				url: 'https://christmas.virtual-identity.com'
			});
		} else {
			showShare = true;
		}
	};

	const submit = async () => {
		try {
			const response = await fetch('/api/leaderboard', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ score })
			});
			if (response.status !== 200) {
				return;
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	onMount(() => {
		if (isInTop25) {
			showUsernameOverlay = true;
		} else {
			submit();
		}
	});

	appState.goalReached =
		data.leads.reduce((acc, lead) => acc + getEuroForScore(lead.score), 0) >= appState.goal;
</script>

<div class="max-h-screen max-w-screen-lg py-16">
	<div
		class="h-full grid grid-cols-2 grid-rows-3 auto-rows-auto md:grid-rows-1 items-center justify-center [grid-template-areas:'tree_result''text_text''actions_actions'] md:[grid-template-areas:'tree_result''tree_text''tree_actions']"
	>
		<img src={getTree(score)} alt="" class="[grid-area:tree]" />

		<div
			class="flex flex-col md:flex-row md:divide-x-[3px] divide-[#1C2E4F] mb-6 md:mb-[2vh] [grid-area:result]"
		>
			<p class="text-lg leading-none pe-6 md:pe-14">
				<span class="font-bold text-3xl md:text-9xl text-[#E5433E]">{score}</span><br />
				collected <br /> ornaments.
			</p>
			{#if !appState.goalReached}
				<p class="text-lg mt-6 md:ps-6 md:ps-14 md:mt-0 leading-none">
					<span class="font-bold text-3xl md:text-9xl text-[#2697E2]"
						>{getEuroForScore(score)}
						<span class="md:text-8xl">€</span>
					</span><br />
					extra donation <br /> earned
				</p>
			{/if}
		</div>
		<div class="[grid-area:text]">
			<p class="md:text-lg leading-relaxed mb-4">{getResultText(score)}</p>
			<p class="md:text-lg leading-relaxed font-bold">
				Virtual Identity wishes you and your loved ones a Merry Christmas and a Happy New Year!
			</p>
		</div>

		<div class="flex justify-center md:justify-start mt-6 md:mt-[2vh] [grid-area:actions]">
			<div class="flex flex-col gap-4">
				<Button href="/" autofocus>
					<img src={ReloadIcon} alt="" class="inline-block w-6 h-6 mr-2" />
					Play again
				</Button>
				<Button variant="secondary" click={share}>
					<img src={ShareIcon} alt="" class="inline-block w-6 h-6 mr-2" />
					Challenge a friend
				</Button>
				<Button click={() => (showModal = true)} variant="secondary">
					<img src={LeaderboardIcon} alt="" class="inline-block w-6 h-6 mr-2" />
					View leaderboard
				</Button>
			</div>
		</div>
	</div>
</div>
<Leaderboard leads={leaderboard} bind:show={showModal} />
<UsernameOverlay bind:show={showUsernameOverlay} onSubmit={onUsernameSubmit} />
<ShareOverlay bind:show={showShare} />
