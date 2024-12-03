<script>
	import { appState } from '$lib/state/appState.svelte';
	import Button from './Button.svelte';
	import Input from './Input.svelte';
	import Modal from './Modal.svelte';
	import { Profanity } from '@2toad/profanity';

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

	const checkUsername = () => {
		const profanity = new Profanity({
			languages: ['en', 'de']
		});

		if (profanity.exists(username)) {
			error = 'Your nickname does not meet our guidelines.';
			return;
		}
		submit();
	};
</script>

<Modal bind:show>
	<h2>Join the DecoDash Leaderboard</h2>
	<p>Please enter your nickname with which you should appear on the leaderboard.</p>
	<Input id="username" name="username" placeholder="Nickname" bind:value={username} />
	<p>
		I agree that my nickname and score are published on the leaderboard according to our
		privacy-policy.
	</p>
	<Button click={checkUsername}>I agree and Submit</Button>
	{#if error}
		<p>{error}</p>
	{/if}
</Modal>

<style>
</style>
