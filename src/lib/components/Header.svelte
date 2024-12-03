<script lang="ts">
	import SoundIcon from '$assets/images/icons/sound.png';
	import InfoIcon from '$assets/images/icons/info.png';
	import Home from '$assets/images/icons/home.png';
	import Logo from '$assets/images/vi_white.png';
	import LogoBlack from '$assets/images/vi_black.png';

	let {
		showHome = false,
		onInfoClick = () => {},
		onSoundClick = () => {},
		logoBlack = false
	} = $props();
</script>

<header class="max-w-screen-lg">
	<a href="https://www.virtual-identity.com/" target="_blank" class="logo">
		<img src={logoBlack ? LogoBlack : Logo} alt="" />
	</a>
	<nav class="header__nav">
		<button onclick={onSoundClick}>
			<img src={SoundIcon} alt="" />
		</button>
		<button onclick={onInfoClick}>
			<img src={InfoIcon} alt="" />
		</button>
		{#if showHome}
			<a href="/">
				<img src={Home} alt="" />
			</a>
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
		top: 0;
		z-index: 1;
	}

	button {
		background-color: transparent;
		border: none;
		cursor: pointer;
	}

	.logo img {
		margin-top: 12px;
		max-width: unset;
	}

	nav {
		display: inline-flex;
		align-items: space-around;
		background-color: white;
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
		padding: 14px 20px 8px 20px;
	}

	button,
	a {
		width: 18px;
		height: 18px;
	}

	button:not(:last-child) {
		margin-right: 14px;
	}

	img:not(.logo) {
		width: 100%;
	}
</style>
