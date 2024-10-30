<script lang="ts">
	import { onMount } from 'svelte';
	import { GameInstance, type GameConfig } from './game-instance.js';
	const createGame = (config: GameConfig, element: HTMLCanvasElementå) => (p5Instance: p5) => {
		const game = new GameInstance(config, p5Instance, element);
		game.startGame();

		p5Instance.windowResized = () => {
			p5Instance.resizeCanvas(p5Instance.windowWidth, p5Instance.windowHeight);
		};
	};

	const gameConfig: GameConfig = {
		maxNumberMisses: Infinity,
		initialSpeed: 5,
		speedIncreaseIntervalInSeconds: 2,
		speedIncrease: 1,
		maxSpeed: 5,
		onGameOver: () => {
			console.log('Game Over');
		},
		theme: {
			backgroundColor: '#142547'
		},
		initialItemCount: 10,
		itemCountIncrease: 2,
		itemCountIncreaseIntervalInSeconds: 5,
		maxItemCount: 20
	};

	const startGame = (config: GameConfig, element: HTMLCanvasElement) => {
		new window.p5(createGame(config, element));
	};

	onMount(() => {
		startGame(gameConfig, document.getElementById('game-container') as HTMLCanvasElement);
	});
</script>

<virtual-joystick data-mode="dynamic" data-lock="y"></virtual-joystick>
<canvas id="game-container"> </canvas>

<style>
	virtual-joystick {
		position: fixed;
		width: 100vw;
		height: 100vh;
	}
</style>
