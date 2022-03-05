<script lang="ts" context="module">
	export interface IErrors {
		[key: string]: string;
	}
</script>

<script lang="ts">
	import Error from "./Error.svelte";

	export let errors: IErrors;

	$: errorArray = Object.keys(errors)
		.sort()
		.map((key) => errors[key]);
</script>

{#each errorArray as error}
	<Error {error} />
{/each}
