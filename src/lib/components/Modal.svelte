<script>
	import CloseIcon from '$assets/images/icons/close.png';
	let { show = $bindable(), children } = $props();

	let dialog = $state(); // HTMLDialogElement

	$effect(() => {
		if (show) {
			dialog.showModal();
		} else {
			dialog.close();
		}
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	onclose={() => (show = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
>
	<div>
		{@render children?.()}
		<!-- svelte-ignore a11y_autofocus -->
		<button autofocus onclick={() => dialog.close()}>
			<img src={CloseIcon} alt="Close" />
		</button>
	</div>
</dialog>

<style>
	dialog {
		max-width: 80vw;
		min-width: 50vw;
		border-radius: 12px;
		border: 1px solid #2697e2;
		padding: 56px 32px 32px 32px;
		position: relative;
		background-color: #00112b;
		color: white;
	}
	dialog::backdrop {
		background: #00112ba6;
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		position: absolute;
		top: 24px;
		right: 32px;
		background: none;
		border: none;
		font-size: 1.5em;
		cursor: pointer;
		fill: white;
	}
</style>
