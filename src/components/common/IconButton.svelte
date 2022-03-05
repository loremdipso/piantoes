<script lang="ts">
	import Icon from "smelte/src/components/Icon";

	import { createEventDispatcher } from "svelte";
	let dispatch = createEventDispatcher();

	export let icon: string;
	export let title: string;
</script>

<button class="" {title} on:click={() => dispatch("click")}>
	<Icon>{icon}</Icon>
</button>
