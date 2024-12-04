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
	<h2 class="mb-6">Join the DecoDash Leaderboard</h2>
	<p class="mb-12">Please enter your nickname with which you should appear on the leaderboard.</p>
	<form class="flex flex-col">
		<Input
			class="mb-3"
			id="username"
			name="username"
			placeholder="Nickname"
			bind:value={username}
		/>
		{#if error}
			<p class="text-red-600">{error}</p>
		{/if}
		<p class="mt-3 mb-12">
			I agree that my nickname and score are published on the leaderboard according to our
			privacy-policy.
		</p>
		<Button class="self-end" click={checkUsername}>I agree and Submit</Button>
	</form>
</Modal>

<style>
</style>
