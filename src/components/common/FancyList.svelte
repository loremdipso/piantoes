<script lang="ts">
</script>

<div class="fancy-list p-2 border-2">
	<slot />
</div>

<style lang="scss">
	.fancy-list {
		> :global(*:nth-child(1n)) {
			background-color: gray;
		}
		> :global(*:nth-child(2n)) {
			background-color: lightgray;
		}
	}
</style>
