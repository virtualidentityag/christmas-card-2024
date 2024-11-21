<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Keys from '$assets/images/keys.png';
	import Star from '$assets/images/star.png';
	import Candy from '$assets/images/candy.png';
	import Bells from '$assets/images/bells.png';
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
				<img src={Bells} alt="" />
				<span>Lorem</span>
			</div>
			<div class="card">
				<img src={Candy} alt="" />
				<span>Lorem</span>
			</div>
			<div class="card">
				<img src={Star} alt="" />
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
