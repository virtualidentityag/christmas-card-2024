<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Tree0 from '$assets/images/tree_0.png';
	import Tree1 from '$assets/images/tree_1.png';
	import Tree2 from '$assets/images/tree_2.png';

	const score = 0;
	const collectedItems = 0;

	const getTreeForScore = (score: number) => {
		if (score < 5) {
			return Tree0;
		} else if (score < 10) {
			return Tree1;
		} else {
			return Tree2;
		}
	};
</script>

<div class="content">
	<img src={getTreeForScore(score)} alt="" />
	<div class="overview">
		<div class="score">
			<h2>Collected items: {collectedItems}</h2>
			<h1>Score: {score}</h1>
		</div>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. In dicta illo facere numquam quidem
			soluta aspernatur debitis magni libero fugiat a error harum blanditiis laborum sequi
			praesentium, quod molestias recusandae?
		</p>
		<p>
			We wish you Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia voluptate rem
			praesentium, reiciendis aspernatur voluptatibus esse.
		</p>
		<div class="actions">
			<Button href="/">Play again</Button>
			<Button variant="secondary">Beat my highscore</Button>
			<Button variant="secondary">View leaderboard</Button>
		</div>
	</div>
</div>

<style>
	.content {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 1rem;
	}

	.score {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.actions {
		display: inline-flex;
		flex-direction: column;
	}
</style>
