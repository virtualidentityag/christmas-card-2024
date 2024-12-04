<script lang="ts">
	let {
		href = '',
		children,
		click = () => {},
		variant = 'primary',
		autofocus = false,
		...rest
	} = $props();
</script>

{#if href}
	<a {href} class={[variant, rest.class || ''].join(' ')} {autofocus}>
		{@render children?.()}
	</a>
{:else}
	<button onclick={click} class={[variant, rest.class || ''].join(' ')} {autofocus}>
		{@render children?.()}
	</button>
{/if}

<style>
	a,
	button {
		display: inline-flex;
		padding: 0px 20px;
		line-height: 40px;
		font-size: 12px;
		border-radius: 20px;
		background-color: #f0f0f0;
		text-transform: uppercase;
		font-weight: 700;
		text-align: center;
		border: 2px solid transparent;
		align-items: center;
		justify-content: center;
	}

	.primary {
		background-color: #f82b53;
		border-color: #f82b53;
		color: #000;
	}

	.primary:hover,
	.primary:focus {
		background-color: #fb4f6a;
		border-color: #fb4f6a;
	}

	.secondary {
		background-color: transparent;
		border-color: #2697e2;
		color: #2697e2;
	}

	.secondary:hover,
	.secondary:focus {
		border-color: #4dabdf;
		color: #4dabdf;
	}
</style>
