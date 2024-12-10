<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Keys from '$assets/images/keys.png';
	import Star from '$assets/images/star.png';
	import Candy from '$assets/images/candy.png';
	import Bells from '$assets/images/bells.png';
</script>

<div class="max-h-screen max-w-screen-lg py-12">
	<div class="h-full flex flex-col md:pt-16">
		<h1 class="text-2xl md:text-5xl">How to play</h1>

		<div
			class="py-6 md:py-12 border-b border-b-[#1C2E4F] grid grid-cols-1 md:grid-cols-2 place-items-center"
		>
			<p class="md:text-lg leading-relaxed">
				Catch decorations by moving your sock left or right using the arrow buttons on your
				keyboard.
			</p>
			<img src={Keys} alt="" class="mt-6 w-1/2" />
		</div>

		<div
			class="pb-6 md:py-12 border-b border-b-[#1C2E4F] grid grid-cols-1 md:grid-cols-2 items-center"
		>
			<p class="md:text-lg leading-relaxed pt-6">
				Collect or avoid special decorations to change the game.
			</p>

			<div class="grid grid-cols-3 pt-6">
				<figure class="flex flex-col items-center text-center">
					<img src={Bells} alt="" class="w-12 md:w-20 aspect-square mb-5" />
					<figcaption>+5 seconds</figcaption>
				</figure>

				<figure class="flex flex-col items-center text-center">
					<img src={Candy} alt="" class="w-12 md:w-20 aspect-square mb-5" />
					<figcaption>Caution: Smaller sock for 10 seconds</figcaption>
				</figure>

				<figure class="flex flex-col items-center text-center">
					<img src={Star} alt="" class="w-12 md:w-20 aspect-square mb-5" />
					<figcaption>Double points for 10 seconds</figcaption>
				</figure>
			</div>
		</div>

		<div class="flex-1 flex justify-end items-end pt-6">
			<Button href="/game">Got it. Let's go!</Button>
		</div>
	</div>
</div>

<style>
	.row {
		display: flex;
	}
	.card {
	}
</style>
