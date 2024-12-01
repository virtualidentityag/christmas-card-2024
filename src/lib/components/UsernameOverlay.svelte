<script>
	import { appState } from '$lib/state/appState.svelte';
	import Button from './Button.svelte';
	import Input from './Input.svelte';
	import Modal from './Modal.svelte';

	let { show = $bindable(), onSubmit = () => {} } = $props();
	let username = $state('');
	let { score } = appState;
	let error = $state('');

	const submit = async () => {
		try {
			const response = await fetch('/api/leaderboard', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, score })
			});
			const data = await response.json();
			if (response.status !== 200) {
				error = data.message;
				return;
			}
			onSubmit(data);
		} catch (error) {
			console.error('Error:', error);
		}
	};
</script>

<Modal bind:show>
	<h2>Join the DecoDash Leaderboard</h2>
	<p>Please enter your nickname with which you should appear on the leaderboard.</p>
	<Input id="username" name="username" placeholder="Username" bind:value={username} /><Button
		click={submit}>Submit</Button
	>
	{#if error}
		<p>{error}</p>
	{/if}
</Modal>

<style>
</style>
