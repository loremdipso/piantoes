<script lang="ts">
	import { active_key } from "@stores/ActiveKey";
	import type { NoteType } from "interfaces";

	export let type: NoteType;
	export let lined = false;
	export let partialLined = false;

	$: show = $active_key?.type === type;
	$: sharp = show && $active_key?.sharp;
</script>

<div class="line" class:lined class:partialLined={partialLined && show}>
	{#if show}
		<div class="note-container">
			{#if sharp}
				<img class="note" src="/resources/sharp_quarter_note.svg" />
			{:else}
				<img class="note" src="/resources/quarter_note.svg" />
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	div {
		position: absolute;
		width: 20px;
		height: 20px;
		margin-left: auto;
		margin-right: auto;
	}

	.line {
		width: 100%;
		height: 4px;
		position: relative;

		&.lined {
			background-color: black;
		}

		&.partialLined {
			background-color: black;
			background-clip: content-box;
			$padding: 42%;
			padding-left: $padding;
			padding-right: $padding;
		}

		.note-container {
			z-index: 1;
			position: absolute;
			left: 50%;

			img {
				height: 10rem;
				max-width: initial;
			}

			.note {
				transform: translateY(-50%) translateX(-50%);
			}
		}
	}
</style>
