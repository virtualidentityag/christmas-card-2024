<script lang="ts">
	import { onMount } from 'svelte';
	import { GameInstance, type GameConfig } from './game-instance.js';
	import { goto } from '$app/navigation';
	const createGame = (config: GameConfig, element: HTMLCanvasElementå) => (p5Instance: p5) => {
		const game = new GameInstance(config, p5Instance, element);
		game.startGame();

		p5Instance.windowResized = () => {
			p5Instance.resizeCanvas(p5Instance.windowWidth, p5Instance.windowHeight);
		};
	};

	$: score = 0;
	$: misses = 0;
	$: remainingTime = 0;

	const gameConfig: GameConfig = {
		maxNumberMisses: Infinity,
		initialSpeed: 1,
		speedIncreaseIntervalInSeconds: 30,
		speedIncrease: 1,
		maxSpeed: 4,
		onGameOver: () => {
			goto('/result');
		},
		theme: {
			backgroundColor: '#142547'
		},
		initialItemCount: 10,
		itemCountIncrease: 2,
		itemCountIncreaseIntervalInSeconds: 5,
		maxItemCount: 20,
		durationInSeconds: 10,
		onScoreChange: (scoreUpdate: number) => {
			score = scoreUpdate;
		},
		onMissChange: (missesUpdate: number) => {
			misses = missesUpdate;
		},
		onTimeChange: (timeRemaining: number) => {
			remainingTime = timeRemaining;
		}
	};

	const startGame = (config: GameConfig, element: HTMLCanvasElement) => {
		new window.p5(createGame(config, element));
	};

	onMount(() => {
		startGame(gameConfig, document.getElementById('game-container') as HTMLCanvasElement);
	});

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes}:${seconds}`;
	};
</script>

<virtual-joystick data-mode="dynamic" data-lock="y"></virtual-joystick>
<canvas id="game-container"> </canvas>

<div class="top-bar">
	<span>Score: {score}</span>
	<span>Time: {formatTime(remainingTime)}</span>
</div>

<style>
	virtual-joystick {
		position: fixed;
		width: 100vw;
		height: 100vh;
	}

	#game-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 1000px;
		height: 1000px;
	}
	.top-bar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100px;
		background-image: url('/sprites/dd_item-menu-background.svg');
		background-size: auto 100%;
	}
</style>
