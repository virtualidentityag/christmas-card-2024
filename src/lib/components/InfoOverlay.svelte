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
		<h2>We are donating</h2>
		<p>
			Virtual Identity is donating to an ⁠allgemeingültige Organistaion with the DZI Siegel, that
			the VI employees will decide for and we announce on date XX
		</p>
	</div>
</Modal>

<style>
	h2 {
		font-size: 40px;
		margin-bottom: 40px;
	}
	ol {
		min-width: 612px;
	}
	ol li {
		display: flex;
		line-height: 44px;
		font-size: 16px;
	}
	.place {
		width: 40px;
	}
	.score {
		flex-grow: 1;
		text-align: right;
	}
	ol li:first-child {
		color: #fcb65b;
	}
	ol li:nth-child(2) {
		color: #e5433e;
	}
	ol li:nth-child(3) {
		color: #2697e2;
	}
</style>
