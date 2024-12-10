<script>
	import Modal from './Modal.svelte';

	let { show = $bindable() } = $props();
</script>

<Modal bind:show>
	<div class="mb-4 overflow-scroll">
		<h2 class="text-2xl mb-2">Terms of use</h2>

		<h3 class="text-lg">1. General Information</h3>
		<ul class="list-disc list-inside">
			<li>
				<b>Game Description:</b> The aim of the game is to help raise additional donations for a good
				cause.
			</li>
			<li>
				<b>Voluntary Participation:</b> Participation in the game is entirely free of charge and without
				obligation.
			</li>
			<li>
				<b>No Personal Gains:</b> Players do not receive any material or immaterial rewards.
			</li>
		</ul>

		<h3 class="text-lg pt-6">2. Donation Mechanism</h3>
		<ul class="list-disc list-inside">
			<li>
				<b>Source of Donations:</b> All donations are fully funded by Virtual Identity AG.
			</li>
			<li>
				<b>Donation Amount:</b> Virtual Identity AG has already pledged to donate €9,000 to a charity
				organization with the DZI seal. Players can help raise up to an additional €1,000 through their
				participation in the game.
			</li>
			<li>
				<b>Donation Cap:</b> The total donation amount is capped at €10,000 (€9,000 already pledged plus
				up to €1,000 from the game).
			</li>
			<li>
				<b>Calculation of Donations:</b> The additional donation amount depends on in-game performance:
				100 collected points unlock 1€ additional donation, over 200 points unlock 2€ additional donation.
			</li>
			<li>
				<b>Recipient Organization:</b> The donation will be made to an organization with the DZI Seal
				of Approval. The specific organization will be selected by all VI employees during December and
				announced through VI's official channels.
			</li>
		</ul>

		<h3 class="text-lg pt-6">3. Game Rules and Fairness</h3>
		<ul class="list-disc list-inside">
			<li>
				<b>Fair Play:</b> The game ensures equal opportunities for all users.
			</li>
			<li>
				<b>No Manipulation:</b> Any attempt to manipulate the game will result in disqualification.
			</li>
		</ul>

		<h3 class="text-lg pt-6">4. Data Protection</h3>
		<ul class="list-disc list-inside">
			<li>
				<b>Privacy Policy:</b> For more information, please refer to our Privacy Policy
				<a href="https://www.virtual-identity.com/privacy-policy/" target="_blank">here</a>.
			</li>
		</ul>

		<h3 class="text-lg pt-6">5. Link Sharing</h3>
		<ul>
			<li>
				The game allows sharing of links to grant other users access. Users are solely responsible
				for deciding who they share the link with. Virtual Identity is not liable for any misuse,
				damages, or issues arising from shared links.
			</li>
		</ul>

		<h3 class="text-lg pt-6">6. Leaderboard Input</h3>
		<ul>
			<li>
				<b>User Responsibility:</b> Players are solely responsible for the content they enter in the
				leaderboard input field.
			</li>
			<li>
				<b>No Personal Information:</b> Players must not enter personal information, such as contact
				details (e.g., phone numbers, email addresses) or sensitive data, in the leaderboard input field.
			</li>
			<li>
				<b>Inappropriate Content:</b> The company reserves the right to remove any entries containing
				offensive, inappropriate, or harmful content without notice.
			</li>
		</ul>

		<h3 class="text-lg pt-6">7. Liability</h3>
		<ul>
			<li>
				<b>No Guarantees:</b> Virtual Identity AG does not guarantee the availability of the game or
				take responsibility for technical issues.
			</li>
			<li>
				<b>Limitation of Liability:</b> Virtual Identity AG is not liable for any damages arising from
				the use of the game.
			</li>
		</ul>

		<h3 class="text-lg pt-6">8. Changes and Termination</h3>
		<ul>
			<li>
				<b>Changes:</b> Virtual Identity AG reserves the right to modify the game or the donation mechanism
				at any time.
			</li>
			<li>
				<b>Termination:</b> The game may be terminated at any time without prior notice. Donations already
				earned through the game will still be honored, up to the maximum additional amount of €1,000.
			</li>
		</ul>

		<h3 class="text-lg pt-6">9. Contact</h3>
		<ul>
			<li>
				For questions or concerns, please contact us at
				<a href="mailto: info@virtual-identity.com"> info@virtual-identity.com </a>
				or Freiburg, Grünwälderstraße 10-14, 79098 Freiburg.
			</li>
		</ul>
	</div>
</Modal>
