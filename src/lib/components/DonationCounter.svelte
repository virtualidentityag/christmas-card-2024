<script lang="ts">
	import Star from '$assets/images/star.png';
	import classnames from 'classnames';

	let { total = 1000, count = 0 } = $props();
	let currentCount = $state(0);

	let goalReached = $state(count >= total);

	$effect(() => {
		const interval = setInterval(() => {
			if (currentCount < count) {
				currentCount = Math.round(
					Math.min(total, currentCount + Math.max(0.5, currentCount / 100))
				);
			} else {
				clearInterval(interval);
			}
		}, 1);
	});
</script>

<div class="grid [grid-template-areas:'label_label''bar_total'] gap-4 items-center w-full">
	{#if goalReached}
		<span class="label text-[#FCB65B]">Fantastic! Goal Reached.</span>
	{:else}
		<span class="label">Extra donations raised:</span>
	{/if}
	<div class="[grid-area:bar] relative h-3 bg-[#1c2b40] rounded-[20px] w-[50vw] min-w-[200px]">
		<div
			class={classnames(
				'absolute top-[0] left-[0] h-full rounded-[20px] flex justify-end items-center',
				{
					'bg-[#fb4f6a]': !goalReached,
					'bg-[#FCB65B]': goalReached
				}
			)}
			style={`width: ${Math.min((currentCount / total) * 100, 100)}%`}
		>
			<div class="absolute w-[30px] aspect-square">
				<img
					src={Star}
					alt=""
					class="absolute aspect-square w-[30px] right-[-15px] max-w-[unset] top-0"
				/>
				{#if !goalReached}
					<div class="bubble">
						<span class="flag-up"></span>
						<span class="count">{currentCount}</span>
						<span>EUR</span>
					</div>
				{/if}
			</div>
		</div>
	</div>
	<span class="total">{total}€</span>
</div>

<style>
	.label {
		grid-area: label;
		font-size: 14px;
		font-weight: bold;
	}

	.bubble {
		font-size: 6px;
		position: absolute;
		width: 40px;
		right: -20px;
		height: 40px;
		bottom: calc(-1 * (40px + 5px + 12px));
		aspect-ratio: 1;
		background-color: #fb4f6a;
		color: #000;
		border-radius: 100px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.flag-up {
		position: absolute;
		top: -8px;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 0;
		border-left: 4.5px solid transparent;
		border-right: 4.5px solid transparent;
		border-bottom: 9px solid #fb4f6a;
	}

	.count {
		font-size: 10px;
		font-weight: bold;
	}

	.total {
		grid-area: total;
		font-size: 10px;
		font-weight: bold;
	}
</style>
