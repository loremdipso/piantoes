<script lang="ts">
	let slots = $$props.$$slots;
</script>

<div class="border-2 border-gray-200">
	{#if slots.header}
		<div class="border-b-2 p-2">
			<slot name="header" />
		</div>
	{/if}

	<div class="p-2">
		<slot />
	</div>
</div>
