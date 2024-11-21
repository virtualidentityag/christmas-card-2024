<script lang="ts">
	let { href = '', children, click = () => {}, variant = 'primary' } = $props();
</script>

{#if href}
	<a {href} class={variant}>
		{@render children?.()}
	</a>
{:else}
	<button onclick={click} class={variant}>
		{@render children?.()}
	</button>
{/if}

<style>
	a,
	button {
		display: inline-block;
		padding: 0px 20px;
		line-height: 40px;
		font-size: 12px;
		border-radius: 20px;
		background-color: #f0f0f0;
		text-transform: uppercase;
		font-weight: 700;
		text-align: center;
		border: 2px solid transparent;
	}

	.primary {
		background-color: #f82b53;
		border-color: #f82b53;
		color: #000;
	}

	.primary:hover,
	.primary:focus {
		background-color: #FB4F6A;
		border-color: #FB4F6A;
	}

	.secondary {
		background-color: transparent;
		border-color: #2697e2;
		color: #2697e2;
	}

	.secondary:hover,
	.secondary:focus {
		border-color: #4DABDF;
		color: #4DABDF;
	}
</style>
