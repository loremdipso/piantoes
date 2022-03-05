<script lang="ts">
	import { Link } from "svelte-navigator";

	let clazz: string = "";
	export { clazz as class };
</script>

<h6 class="select-none tracking-widest text-lg {clazz}">
	<Link to="/">Fantasy Fitness</Link>
</h6>
