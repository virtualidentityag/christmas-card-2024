<script lang="ts">
	let { id, name, type = 'text', value = $bindable(''), placeholder } = $props();
</script>

<input {type} {id} {name} {placeholder} bind:value />

<style>
	input {
		padding: 0 20px;
		border-radius: 20px;
		height: 40px;
		background-color: #1c2b40;
	}
</style>
