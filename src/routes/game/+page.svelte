<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { GameInstance, type GameConfig } from '$lib/game/game-instance.js';
	import { goto } from '$app/navigation';
	import { PowerUp } from '$lib/game/power-up.js';
	import { appState } from '$lib/state/appState.svelte';

	let blurHandler;
	let focusHandler;
	const createGame = (config: GameConfig, element: HTMLCanvasElement) => (p5Instance: p5) => {
		destroyGame = () => {
			p5Instance.remove();
		};
		const game = new GameInstance(config, p5Instance, element);
		game.startGame();

		p5Instance.windowResized = () => {
			p5Instance.resizeCanvas(p5Instance.windowWidth, p5Instance.windowHeight);
		};
		blurHandler = () => {
			game.pauseGame();
			running = false;
			p5Instance.noLoop();
		};

		focusHandler = () => {
			game.resumeGame();
			running = true;
			p5Instance.loop();
		};

		window.addEventListener('blur', blurHandler);
		window.addEventListener('focus', focusHandler);
	};
	let score = $state(0);
	let misses = $state(0);
	let remainingTime = $state(0);
	class S extends PowerUp {
		effectDuration = 10;
	}

	let activePowerUps = $state([]);

	let running = $state(false);

	let destroyGame = $state(() => {});

	const startGame = (config: GameConfig, element: HTMLCanvasElement) => {
		new window.p5(createGame(config, element));
	};

	onMount(() => {
		destroyGame();
		startGame(
			{
				maxNumberMisses: Infinity,
				initialSpeed: 2,
				speedIncreaseIntervalInSeconds: 30,
				speedIncrease: 1,
				maxSpeed: 6,
				theme: {
					backgroundColor: '#142547'
				},
				initialItemCount: Math.max(5, Math.round(window.innerWidth / 100)),
				itemCountIncrease: 1,
				itemCountIncreaseIntervalInSeconds: 10,
				maxItemCount: 20,
				durationInSeconds: 60,
				powerUpChance: 1,
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
					window.removeEventListener('blur', blurHandler);
					window.removeEventListener('focus', focusHandler);
					goto('/result');
				},
				addSoundListener: (listener) => {
					$effect(() => {
						listener(appState.soundEnabled);
					});
				}
			},
			document.getElementById('game-container') as HTMLCanvasElement
		);
	});

	onDestroy(() => {
		// destroyGame();
	});

	const formatTime = (time: number) => {
		const ensureTwoDigits = ensureDigits(2);
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${ensureTwoDigits(minutes)}:${ensureTwoDigits(seconds)}`;
	};

	const formatScore = (score: number) => {
		const ensureThreeDigits = ensureDigits(3);
		return ensureThreeDigits(score);
	};

	const ensureDigits = (digits: number) => (num: number) => num.toString().padStart(digits, '0');
</script>

<div>
	<canvas id="game-container" class="absolute inset-0"> </canvas>
	<virtual-joystick data-mode="dynamic" data-lock="y" class="top-0 left-0 fixed w-screen h-screen"
	></virtual-joystick>

	<div class={running ? 'playing' : ''}>
		<div
			class="fixed top-0 left-0 w-full h-10 bg-white bg-[auto_100%] text-black flex justify-center"
		>
			<div class="max-w-screen-lg flex items-center gap-4 h-full px-16 md:px-24 w-full">
				<p>Score: {formatScore(score)}</p>
				<p class="min-w-[76px]">Time: {formatTime(remainingTime)}</p>
				<div class="items-center md:flex hidden">
					<span>Active power up:</span>
					{#each activePowerUps as powerUp}
						<img src={powerUp.spritePaths[0]} alt="" class="w-10 h-10" />
					{/each}
				</div>
			</div>
			<div
				class="snow absolute left-0 top-full h-[63px] w-full bg-[url('/images/ui/snow.png')]"
			></div>
		</div>
		<div
			class="fixed -z-10 bottom-0 left-0 w-full h-[118px] bg-[url('/images/ui/bottom.png')]"
		></div>
	</div>
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
