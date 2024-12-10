<script lang="ts">
	let {
		id = '',
		name = '',
		type = 'text',
		value = $bindable(''),
		placeholder = '',
		autofocus = false,
		maxLength = 100,
		element = $bindable(),
		...rest
	} = $props();
</script>

<input
	bind:this={element}
	class={rest.class || ''}
	{type}
	{id}
	{name}
	{placeholder}
	{autofocus}
	maxlength={maxLength}
	bind:value
/>

<style>
	input {
		width: 100%;
		padding: 0 20px;
		border-radius: 20px;
		height: 40px;
		background-color: #1c2b40;
	}
</style>
