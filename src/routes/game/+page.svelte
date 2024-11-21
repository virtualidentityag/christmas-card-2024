<script lang="ts">
	import { onMount } from 'svelte';
	import { GameInstance, type GameConfig } from './game-instance.js';
	import { goto } from '$app/navigation';
	import { run } from 'svelte/legacy';
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

	$: running = false;

	const gameConfig: GameConfig = {
		maxNumberMisses: Infinity,
		initialSpeed: 1,
		speedIncreaseIntervalInSeconds: 30,
		speedIncrease: 1,
		maxSpeed: 4,
		theme: {
			backgroundColor: '#142547'
		},
		initialItemCount: 10,
		itemCountIncrease: 1,
		itemCountIncreaseIntervalInSeconds: 10,
		maxItemCount: 20,
		durationInSeconds: 60,
		powerUpChance: 0.2,
		onScoreChange: (scoreUpdate: number) => {
			score = scoreUpdate;
		},
		onMissChange: (missesUpdate: number) => {
			misses = missesUpdate;
		},
		onTimeChange: (timeRemaining: number) => {
			remainingTime = timeRemaining;
		},
		onGameStart: () => {
			running = true;
		},
		onGameEnd: () => {
			running = false;
			goto('/result');
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

<div class={running ? 'playing' : ''}>
	<div class="top-bar">
		<span>Score: {score}</span>
		<span>Time: {formatTime(remainingTime)}</span>
		<div class="snow"></div>
	</div>
	<div class="bottom-bar"></div>
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
		height: 40px;
		background-color: white;
		background-size: auto 100%;
	}

	.top-bar .snow {
		position: absolute;
		bottom: -63px;
		left: 0;
		width: 100%;
		height: 63px;
		background-image: url('/images/ui/snow.png');
		background-size: auto 100%;
		animation: snow 2s infinite steps(2);
		animation-play-state: paused;
	}

	.playing .top-bar .snow {
		animation-play-state: running;
	}

	@keyframes snow {
		from {
			background-position: 0 0;
		}
		to {
			background-position: 90px 0;
		}
	}

	.bottom-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-image: url('/images/ui/bottom.png');
	}
</style>
