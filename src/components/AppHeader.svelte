<script lang="ts">
	import { active_key } from "@stores/ActiveKey";
	import { show_sheet_music } from "@stores/ShowSheetMusic";
	import { is_muted } from "@stores/Muted";
	import { onMount } from "svelte";
	import Button from "smelte/src/components/Button/Button.svelte";

	function getPWADisplayMode() {
		const isStandalone = window.matchMedia(
			"(display-mode: standalone)"
		).matches;
		if (document.referrer.startsWith("android-app://")) {
			return "twa";
		} else if ((navigator as any).standalone || isStandalone) {
			return "standalone";
		}
		return "browser";
	}

	let show_install_button = getPWADisplayMode() === "browser";
	let deferredPrompt;

	onMount(() => {
		window.addEventListener("beforeinstallprompt", (e) => {
			e.preventDefault();
			deferredPrompt = e;
		});
	});

	function install() {
		if (deferredPrompt) {
			deferredPrompt.prompt();
			deferredPrompt.userChoice.then((choice) => {
				if (choice.outcome === "accepted") {
					console.log("yay!");
				}
				deferredPrompt = null;
			});
		}
	}
</script>

<div class="header-text flex-grow text-center">
	{$active_key?.name || "none"}
</div>

{#if show_install_button && deferredPrompt}
	<Button on:click={() => install()} color="secondary">install</Button>
{/if}

<!-- <button class="flex" on:click={() => ($is_muted = !$is_muted)}>
	{#if $is_muted}
		<img src="resources/muted.svg" />
	{:else}
		<img src="resources/unmuted.svg" />
	{/if}
</button> -->
<style lang="scss">
	// img {
	// 	width: 50px;
	// }

	// .header-text {
	// 	// TODO(hack)
	// 	margin-left: 50px;
	// }
	//
</style>
