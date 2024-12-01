<script lang="ts">
	import SoundIcon from '$assets/images/icons/sound.png';
	import InfoIcon from '$assets/images/icons/info.png';
	import Logo from '$assets/images/vi_white.png';

	let { showHome = false, onInfoClick = () => {}, onSoundClick = () => {} } = $props();
</script>

<header>
	<a href="https://www.virtual-identity.com/" target="_blank" class="logo">
		<img src={Logo} alt="" />
	</a>
	<nav class="header__nav">
		<button onclick={onSoundClick}>
			<img src={SoundIcon} alt="" />
		</button>
		<button onclick={onInfoClick}>
			<img src={InfoIcon} alt="" />
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
		position: fixed;
		z-index: 1;
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
