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
	class="max-h-[80vh] w-[80vw] max-w-screen-lg h-auto md:h-fit rounded-[12px] border-[1px] border-[solid] border-[#2697e2] px-[32px] py-[56px] relative bg-[#00112b] text-[white]"
	bind:this={dialog}
	onclose={() => (show = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
>
	<button
		class="absolute top-[24px] right-[32px] bg-none border-[none] text-[1.5em] cursor-pointer fill-[white]"
		autofocus
		onclick={() => dialog.close()}
	>
		<img src={CloseIcon} alt="Close" />
	</button>
	<div class="max-h-full overflow-scroll">
		{@render children?.()}
		<!-- svelte-ignore a11y_autofocus -->
	</div>
</dialog>

<style>
	dialog::backdrop {
		background: #00112ba6;
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
</style>
