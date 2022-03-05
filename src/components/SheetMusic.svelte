<script lang="ts">
	import { active_key } from "@stores/ActiveKey";
	import { NoteType } from "interfaces";
	import Line from "./Line.svelte";
</script>

<div class="sheet-music">
	<div class="sheet-music-section">
		<div class="img-container">
			<img src="resources/treble_clef.svg" />
		</div>

		<div class="line-container">
			<Line type={NoteType.B} />
			<Line type={NoteType.A} partialLined />
			<Line type={NoteType.G} />

			<Line type={NoteType.F} lined />
			<Line type={NoteType.E} />
			<Line type={NoteType.D} lined />
			<Line type={NoteType.C} />
			<Line type={NoteType.B} lined />
			<Line type={NoteType.A} />
			<Line type={NoteType.G} lined />
			<Line type={NoteType.F} />
			<Line type={NoteType.E} lined />

			<Line type={NoteType.D} />
			<Line type={NoteType.C} partialLined />
			<Line type={NoteType.B} />
		</div>
	</div>

	<div class="sheet-music-section">
		<div class="img-container">
			<img src="resources/base_clef.svg" />
		</div>

		<div class="line-container">
			<Line type={NoteType.D} />
			<Line type={NoteType.C} partialLined />
			<Line type={NoteType.B} />

			<Line type={NoteType.A} lined />
			<Line type={NoteType.G} />
			<Line type={NoteType.F} lined />
			<Line type={NoteType.E} />
			<Line type={NoteType.D} lined />
			<Line type={NoteType.C} />
			<Line type={NoteType.B} lined />
			<Line type={NoteType.A} />
			<Line type={NoteType.G} lined />

			<Line type={NoteType.F} />
			<Line type={NoteType.E} partialLined />
			<Line type={NoteType.D} />
		</div>
	</div>
</div>

<style lang="scss">
	.sheet-music {
		width: 100%;
		height: 60%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;

		.sheet-music-section {
			height: 45%;
			max-height: 45%;
			flex-grow: 1;
			display: flex;

			.img-container {
				width: 20%;
				max-height: 100%;
				img {
					height: 100%;
					max-height: 100%;
					max-width: 100%;
					display: block;
					margin: auto;
				}
			}

			.line-container {
				padding-left: 1rem;
				padding-right: 1rem;
				flex-grow: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
			}
		}
	}
</style>
