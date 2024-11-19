<script lang="ts">
	import SoundIcon from '$lib/icons/sound.svg?component';
	import InfoIcon from '$lib/icons/info.svg?component';
	import Logo from '$lib/icons/logo.svg?component';

	let { showHome = false } = $props();
</script>

<header>
	<a href="https://www.virtual-identity.com/" target="_blank" class="logo">
		<Logo style={{ color: 'white' }} />
	</a>
	<nav class="header__nav">
		<button>
			<SoundIcon />
		</button>
		<button>
			<InfoIcon />
		</button>
		{#if showHome}
			<a href="/">H</a>
		{/if}
	</nav>
</header>

<style>
	header {
		padding: 0px 20px 10px 20px;
		display: inline-flex;
		justify-content: space-between;
		width: 100%;
		box-sizing: border-box;
	}

	button {
		background-color: transparent;
		border: none;
		cursor: pointer;
	}

	.logo {
		fill: white;
		margin-top: 12px;
	}

	nav {
		display: inline-flex;
		align-items: space-around;
		background-color: white;
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
		padding: 8px 20px;
	}
</style>
