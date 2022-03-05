<script lang="ts">
	import { show_sheet_music } from "@stores/ShowSheetMusic";

	import SheetMusic from "@components/SheetMusic.svelte";
	import Piano from "@components/Piano.svelte";
	import AppHeader from "@components/AppHeader.svelte";
	import SoundPlayer from "@components/SoundPlayer.svelte";
	import GithubCorner from "@components/common/GithubCorner.svelte";
	import Installer from "@components/Installer.svelte";
</script>

<header
	class="py-1 relative slide-in-from-top bg-primary-300 dark:bg-black flex h-16 space-between items-center left-0 p-0 shadow top-0 w-full z-20"
>
	<AppHeader />
	<GithubCorner
		href="https://github.com/loremdipso/piantoes"
		position="topLeft"
		fill="#00b7ff"
		small
	/>
</header>

<SoundPlayer />

<main class="fade-in">
	{#if $show_sheet_music}
		<SheetMusic />
	{/if}

	<Piano />

	<Installer />
</main>

<!-- <StickyFooter /> -->
<style lang="scss">
	header {
		// TODO(HACK): this is to match the github corner's height
		min-height: 64px;
	}
	:global(:root) {
		--key-border-width: 8px;
		--num-white-keys: initial;
	}

	:global(body) {
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	main {
		flex-grow: 1;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	// :global(a) {
	// 	// TODO: figure out why this doesn't work
	// 	// @apply text-blue-200;
	// 	color: rgba(29, 142, 241, 1);
	// }

	:global(.padded-table td, th) {
		padding: 1rem;
	}

	:global(.padded-table d:last-child, th:last-child) {
		width: 5rem;
	}

	.slide-in-from-top {
		animation: 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94) 0s 1 SlideDown;
	}
	@keyframes SlideDown {
		0% {
			transform: translate3d(0, -100%, 0);
		}
		100% {
			transform: translateZ(0);
		}
	}

	:global(.slide-in-from-bottom) {
		animation: 3000ms cubic-bezier(0.17, 0.04, 0.03, 0.94) 0s 1 SlideUp;
	}
	@keyframes SlideUp {
		0% {
			transform: translate3d(0, 100%, 0);
		}
		50% {
			transform: translate3d(0, 100%, 0);
		}
		100% {
			transform: translateZ(0);
		}
	}

	:global(.fade-in) {
		animation: 1s ease-out 0s 1 FadeIn;
	}
	@keyframes FadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
