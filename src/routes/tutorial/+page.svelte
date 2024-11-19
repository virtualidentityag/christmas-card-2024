<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Keys from '$lib/icons/keys.png';
	import Star from '$lib/icons/star.svg?component';
	import Candy from '$lib/icons/candy.svg?component';
	import Bells from '$lib/icons/bells.svg?component';
</script>

<div class="content">
	<h1>How to play</h1>
	<div class="row">
		<p>
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat odio et velit neque ad.
			Voluptatibus, quaerat. Corporis esse reprehenderit, voluptatum corrupti cupiditate eveniet
			maiores, quos pariatur, laudantium molestiae nulla eligendi?
		</p>
		<img src={Keys} alt="" />
	</div>
	<hr />
	<div class="row">
		<p>
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat odio et velit neque ad.
			Voluptatibus, quaerat. Corporis esse reprehenderit, voluptatum corrupti cupiditate eveniet
			maiores, quos pariatur, laudantium molestiae nulla eligendi?
		</p>
		<div class="row">
			<div class="card">
				<Bells />
				<span>Lorem</span>
			</div>
			<div class="card">
				<Candy />
				<span>Lorem</span>
			</div>
			<div class="card">
				<Star />
				<span>Lorem</span>
			</div>
		</div>
	</div>
	<hr />
</div>

<Button href="/game">Got it. Let's go!</Button>

<style>
	.row {
		display: flex;
	}
	.card {
	}
</style>
