<script lang="ts">
	import Button from "smelte/src/components/Button";

	import FancyDialog from "@components/common/FancyDialog.svelte";

	export let showDialog = true;
</script>

<FancyDialog small bind:showDialog>
	<h5 slot="title">Welcome!</h5>

	<div>Do you like exercise? Then this is the app for you.</div>

	<div slot="actions">
		<Button text on:click={() => (showDialog = false)}>Got it!</Button>
	</div>
</FancyDialog>
