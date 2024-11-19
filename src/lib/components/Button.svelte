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
	button {
		background-color: #f0f0f0;
		border: none;
		border-radius: 8px;
		padding: 8px 16px;
		cursor: pointer;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

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
	}

	.primary {
		background-color: #f82b53;
		color: #000;
	}

	.secondary {
		background-color: transparent;
		color: #2697e2;
		border: #2697e2 2px solid;
	}
</style>
