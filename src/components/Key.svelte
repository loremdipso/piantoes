<script lang="ts">
	import { ClassBuilder } from "@utils/misc";

	import type { IKey } from "../interfaces";
	import { active_key } from "@stores/ActiveKey";

	export let key: IKey;

	$: pressed = $active_key === key;

	function click() {
		if ($active_key === key) {
			$active_key = null;
		} else {
			$active_key = key;
		}
	}

	let cb = new ClassBuilder("key");
	$: classes = cb
		.reset()
		.addIfElse(key.sharp, "key-black", "key-white")
		.addIf(pressed, "pressed")
		.get();
</script>

<div class={classes} on:mousedown={() => click()} />

<style lang="scss">
	.key {
		display: inline-block;
		user-select: none;
		cursor: pointer;
	}

	.key-white {
		// need to account for border
		width: calc((100vw - var(--key-border-width)) / var(--num-white-keys));
		height: 100%;
		background-color: white;
		border-right: var(--key-border-width) solid black;
		border-top: var(--key-border-width) solid black;
		border-bottom: var(--key-border-width) solid black;
	}

	.key-black {
		border: calc(var(--key-border-width) / 2) solid black;
		background-color: black;
		position: absolute;
		width: calc((100vw / var(--num-white-keys) / 2));
		height: 50%;
		transform: translateX(calc(-50% - var(--key-border-width) / 2));
	}

	.pressed {
		background-color: yellow;
	}
</style>
