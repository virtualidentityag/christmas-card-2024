<script lang="ts">
	import Star from '$assets/images/star.png';

	let { total = 1000, count = 0 } = $props();
	let currentCount = $state(0);

	$effect(() => {
		const interval = setInterval(() => {
			if (currentCount < count) {
				currentCount += 1;
			} else {
				clearInterval(interval);
			}
		}, 1);
	});
</script>

<div class="container">
	<span class="label">Additional donations collected:</span>
	<div class="bar">
		<div class="indicator" style={`width: ${Math.min((currentCount / total) * 100, 100)}%`}>
			<div class="marker">
				<img src={Star} alt="" />
				<div class="bubble">
					<span class="flag-up"></span>
					<span class="count">{currentCount}</span>
					<span>EUR</span>
				</div>
			</div>
		</div>
	</div>
	<span class="total">{total}€</span>
</div>

<style>
	.container {
		display: grid;
		grid-template-rows: auto auto;
		grid-template-columns: 1fr auto;
		grid-template-areas: 'label label' 'bar total';
		gap: 12px;
		align-items: center;
		width: 100%;
	}

	.label {
		grid-area: label;
		font-size: 14px;
		font-weight: bold;
	}

	.bar {
		grid-area: bar;
		position: relative;
		height: 12px;
		background-color: #1c2b40;
		border-radius: 20px;
		width: 50vw;
		min-width: 200px;
	}

	.indicator {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		background-color: #fb4f6a;
		border-radius: 20px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.marker {
		position: relative;
		width: 30px;
		height: 30px;
	}

	img {
		width: 30px;
		height: 30px;
		position: absolute;
		right: -15px;
		max-width: unset;
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
