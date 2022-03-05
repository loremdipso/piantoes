<script lang="ts">
	import { active_key } from "@stores/ActiveKey";
	import { show_sheet_music } from "@stores/ShowSheetMusic";
	import { is_muted } from "@stores/Muted";
</script>

<div class="header-text flex-grow text-center">
	{$active_key?.name || "none"}
</div>

<button class="flex" on:click={() => ($is_muted = !$is_muted)}>
	{#if $is_muted}
		<img src="resources/muted.svg" />
	{:else}
		<img src="resources/unmuted.svg" />
	{/if}
</button>

<style lang="scss">
	img {
		width: 50px;
	}

	.header-text {
		// TODO(hack)
		margin-left: 50px;
	}
</style>
