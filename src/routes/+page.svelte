<script lang="ts">
	import Logo from '$assets/images/logo.png';

	import Button from '$lib/components/Button.svelte';
	import DonationCounter from '$lib/components/DonationCounter.svelte';
	import Leaderboard from '$lib/components/Leaderboard.svelte';
	import { getEuroForScore } from '$lib/util/getEuroForScore';
	import type { PageData } from './$types';

	let showModal = $state(false);
	let { data }: { data: PageData } = $props();
</script>

<div class="h-screen max-h-screen flex flex-col justify-center items-center text-center">
	<p class="text-center tracking-wider max-w-screen-sm">
		<span class="text-3xl">Virtual Identity</span> <br /> <span class="text-xs">presents</span>
	</p>

	<div class="relative -mt-10 -mb-6 w-screen max-w-screen-lg">
		<img src={Logo} alt="" class="w-full" />
	</div>

	<p class="max-w-screen-sm text-center text-sm leading-6 font-light mb-4">
		Collect as many decorative items for your Christmas tree as possible. VI is donating 10,000
		euros to a good cause this year and by diligently collecting decorative items we will donate up
		to an additional 1,000 euros on top. Every sock filled with morethan 200 decorative items will
		contribute one euro to the donation box.
	</p>

	<p class="max-w-screen-sm text-center text-sm leading-6 font-bold mb-12">
		Sit back, get ready and let the Deco Dash begin.
	</p>

	<div class="flex items-center justify-center gap-4 mb-12">
		<Button href="/tutorial">Start the game</Button>
		<Button click={() => (showModal = true)} variant="secondary">Highscore Board</Button>
	</div>
	<div>
		<DonationCounter
			total={1000}
			count={data.leads.reduce((acc, lead) => acc + getEuroForScore(lead.score), 0)}
		/>
	</div>
</div>
<Leaderboard leads={data.leads} bind:show={showModal} />
