<script>
	import Modal from './Modal.svelte';

	let { show = $bindable() } = $props();
</script>

<Modal bind:show>
	<div class="about-us">
		<h2>About Virtual Identity</h2>
		<p>
			Every company will become digital. And digital success is rooted in two core skills.
			Extracting data insights to optimise business practices. Proving empathy to create what’s
			relevant. We shaped our portfolio to cover both, while learning in close collaboration with
			our clients, what drives success. This is what we mean by Human Centered Business Growth: an
			attitude we embrace in every challenge.
		</p>
	</div>
	<div class="donation">
		<h2>Our donation</h2>
		<p>
			Virtual Identity will donate to a cause chosen by our employees, ensuring it aligns with our
			values and has the DZI Seal for trusted organisations.
		</p>
	</div>
</Modal>

<style>
</style>
