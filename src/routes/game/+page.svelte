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

	const gameConfig = {
		itemCount: 10,
		initialSpeed: 1,
		maxNumberMisses: Infinity,
		speedIncreaseIntervalInSeconds: 10,
		speedIncrease: 0,
		onGameOver: () => {
			console.log('Game Over');
		},
		theme: {
			backgroundColor: '#142547'
		}
	};

	const startGame = (config: GameConfig, element: HTMLCanvasElement) => {
		new window.p5(createGame(config, element));
	};

	onMount(() => {
		startGame(gameConfig, document.getElementById('game-container') as HTMLCanvasElement);
	});
</script>

<canvas id="game-container"> </canvas>
