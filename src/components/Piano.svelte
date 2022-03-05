<script lang="ts">
	import Key from "./Key.svelte";
	import { KEYS } from "@config/Constants";
</script>

<div class="piano">
	{#each KEYS as key}
		<Key {key} />
	{/each}
</div>

<style lang="scss">
	.piano {
		position: relative;
		background-color: green;
		height: 40%;
		width: 100%;
		border-left: var(--key-border-width) solid black;

		// NOTE: this is a hack, without which the last key goes to the next line
		white-space: nowrap;
		overflow: hidden;
	}
</style>
