<script lang="ts">
	import Button from './Button.svelte';
	import Input from './Input.svelte';
	import Modal from './Modal.svelte';

	let { show = $bindable() } = $props();
	let input: HTMLInputElement;

	const copy = () => {
		input.select();
		input.setSelectionRange(0, 99999); // For mobile devices
		// Copy the text inside the text field
		navigator.clipboard.writeText(input.value);
		// Alert the copied text
		alert('Copied to your clipboard');
		show = false;
	};
</script>

<Modal bind:show>
	<h2 class="mb-6 text-4xl">Share this christmas experience with a colleague</h2>
	<div class="flex">
		<Input class="mr-6" value="https://christmas.virtual-identity.com" bind:element={input} />
		<Button class="" click={copy}>Copy</Button>
	</div>
</Modal>

<style>
</style>
