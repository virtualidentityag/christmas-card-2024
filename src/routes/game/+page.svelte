<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { GameInstance, type GameConfig } from '$lib/game/game-instance.js';
	import { goto } from '$app/navigation';
	import type { PowerUp } from '$lib/game/power-up.js';
	import { appState } from '$lib/state/appState.svelte';

	const createGame = (config: GameConfig, element: HTMLCanvasElement) => (p5Instance: p5) => {
		destroyGame = () => {
			p5Instance.remove();
		};
		const game = new GameInstance(config, p5Instance, element);
		game.startGame();

		p5Instance.windowResized = () => {
			p5Instance.resizeCanvas(p5Instance.windowWidth, p5Instance.windowHeight);
		};

		window.addEventListener('blur', () => {
			game.pauseGame();
			running = false;
			p5Instance.noLoop();
		});

		window.addEventListener('focus', () => {
			game.resumeGame();
			running = true;
			p5Instance.loop();
		});
	};
	let score = $state(0);
	let misses = $state(0);
	let remainingTime = $state(0);
	let activePowerUps = $state([]);

	let running = $state(false);

	let destroyGame = $state(() => {});

	const gameConfig: GameConfig = {
		maxNumberMisses: Infinity,
		initialSpeed: 2,
		speedIncreaseIntervalInSeconds: 30,
		speedIncrease: 1,
		maxSpeed: 6,
		theme: {
			backgroundColor: '#142547'
		},
		initialItemCount: 10,
		itemCountIncrease: 1,
		itemCountIncreaseIntervalInSeconds: 10,
		maxItemCount: 20,
		durationInSeconds: 60,
		powerUpChance: 0.5,
		onScoreChange: (scoreUpdate: number) => {
			score = scoreUpdate;
		},
		onMissChange: (missesUpdate: number) => {
			misses = missesUpdate;
		},
		onTimeChange: (timeRemaining: number) => {
			remainingTime = timeRemaining;
		},
		onPowerUpChange: (powerUps: PowerUp[]) => {
			activePowerUps = powerUps;
		},
		onGameStart: () => {
			running = true;
		},
		onGameEnd: () => {
			running = false;
			appState.score = score;
			goto('/result');
		},
		addSoundListener: (listener) => {
			$effect(() => {
				listener(appState.soundEnabled);
			});
		}
	};

	const startGame = (config: GameConfig, element: HTMLCanvasElement) => {
		new window.p5(createGame(config, element));
	};

	onMount(() => {
		destroyGame();
		startGame(gameConfig, document.getElementById('game-container') as HTMLCanvasElement);
	});

	onDestroy(() => {
		destroyGame();
	});

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes}:${seconds}`;
	};
</script>

<canvas id="game-container" class="absolute inset-0"> </canvas>
<virtual-joystick data-mode="dynamic" data-lock="y" class="fixed w-screen h-screen"
></virtual-joystick>

<div class={running ? 'playing' : ''}>
	<div class="fixed top-0 left-0 w-full h-10 bg-white bg-[auto_100%] text-black">
		<div class="flex items-center gap-10 h-full px-24">
			<p>Score: {score}</p>
			<p>Time: {formatTime(remainingTime)}</p>
			<div class="flex gap-2 items-center">
				<p>Active power up:</p>
				{#each activePowerUps as powerUp}
					<img src={powerUp.spritePaths[0]} alt="" class="w-10 h-10" />
				{/each}
			</div>
		</div>
		<div
			class="snow absolute left-0 top-full h-[63px] w-full bg-[url('/images/ui/snow.png')]"
		></div>
	</div>
	<div class="fixed -z-10 bottom-0 left-0 w-full h-[118px] bg-[url('/images/ui/bottom.png')]"></div>
</div>

<style>
	.snow {
		animation: snow 2s infinite steps(2);
		animation-play-state: paused;
	}

	.playing .snow {
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
</style>
