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

	<div class="relative -mt-10 -mb-6 max-w-screen-lg">
		<img src={Logo} alt="" class="w-full" />
	</div>

	<p class="max-w-screen-sm text-center text-sm leading-6 font-light mb-4">
		The countdown is on! Virtual Identity is donating 9,000 € to charity this Christmas. You can
		help to unlock up to 1,000 € on top. Catch as many decorations as you can to deck out your
		Christmas tree before time runs out. Collect over 100 ornaments, and VI will add an extra €1 to
		our charity donation.
	</p>

	<p class="max-w-screen-sm text-center text-sm leading-6 font-bold mb-12">
		Ready, set... let the Deco Dash begin!
	</p>

	<div class="flex items-center justify-center gap-4 mb-12">
		<Button href="/tutorial">Play now</Button>
		<Button click={() => (showModal = true)} variant="secondary">Leaderboard</Button>
	</div>
	<div>
		<DonationCounter
			total={1000}
			count={data.leads.reduce((acc, lead) => acc + getEuroForScore(lead.score), 0)}
		/>
	</div>
</div>
<Leaderboard leads={data.leads} bind:show={showModal} />
