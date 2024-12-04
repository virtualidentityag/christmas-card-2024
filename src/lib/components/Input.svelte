<script lang="ts">
	let {
		id,
		name,
		type = 'text',
		value = $bindable(''),
		placeholder,
		autofocus,
		...rest
	} = $props();
</script>

<input class={rest.class || ''} {type} {id} {name} {placeholder} {autofocus} bind:value />

<style>
	input {
		width: 100%;
		padding: 0 20px;
		border-radius: 20px;
		height: 40px;
		background-color: #1c2b40;
	}
</style>
