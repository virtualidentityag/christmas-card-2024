<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Keys from '$assets/images/keys.png';
	import Star from '$assets/images/star.png';
	import Candy from '$assets/images/candy.png';
	import Bells from '$assets/images/bells.png';
</script>

<div class="h-screen max-h-screen py-16 px-24">
	<div class="h-full flex flex-col pt-16">
		<h1 class="text-5xl">How to play</h1>

		<div class="py-14 border-b border-b-[#1C2E4F] grid grid-cols-2 items-center">
			<p class="text-lg leading-relaxed">
				Collect items by pressing the arrows on your <br>
				keyboard. You only have to move left or right. 
			</p>
			<img src={Keys} alt="" class="ms-12" />
		</div>

		<div class="py-14 border-b border-b-[#1C2E4F] grid grid-cols-2 items-center">
			<p class="text-lg leading-relaxed">Collect special items to unlock special features.</p>

			<div class="grid grid-cols-3">
				<figure class="flex flex-col items-center text-center">
					<img src={Bells} alt="" class="w-20 h-20 mb-5" />
					<figcaption>Earn 5 seconds <br> additional time</figcaption>
				</figure>

				<figure class="flex flex-col items-center text-center">
					<img src={Candy} alt="" class="w-20 h-20 mb-5" />
					<figcaption>Reduce size of sock <br> for 10 seconds</figcaption>
				</figure>

				<figure class="flex flex-col items-center text-center">
					<img src={Star} alt="" class="w-20 h-20 mb-5" />
					<figcaption>Double your grab count<br>for 10 seconds</figcaption>
				</figure>
			</div>
		</div>

		<div class="flex-1 flex justify-end items-end">
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
