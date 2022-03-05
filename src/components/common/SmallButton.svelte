<script lang="ts">
	import { createEventDispatcher } from "svelte";
	let dispatch = createEventDispatcher();

	import Button from "smelte/src/components/Button";
	import { ClassBuilder } from "@utils/misc";

	export let disabled: boolean = false;
	export let reverse: boolean = false;
	export let classes: string = "";
	export let color: string;
	export let icon: string;
	export let title: string;

	const cb = new ClassBuilder("m-1 px-3 py-2 small-button-vertical-padding");
	$: classes = cb
		.reset()
		.add(classes)
		.addIf(reverse, "flex flex-row-reverse")
		.get();
</script>

<Button
	{classes}
	{disabled}
	{color}
	remove="p-4"
	{icon}
	{title}
	on:click={() => dispatch("click")}
>
	{title}
</Button>

<style lang="scss">
	:global(.small-button-vertical-padding) {
		$padding: 0.5rem;
		padding-top: $padding;
		padding-bottom: $padding;
	}
</style>
