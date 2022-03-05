<script lang="ts">
	import AppLink from "@components/common/AppLink.svelte";

	const iconClasses = "px-4";
</script>

<div class="sticky-footer slide-in-from-bottom">
	<AppLink route={leagueSummaryRoute} icon="groups" class={iconClasses} />

	<div class="vl" />
	<AppLink
		route={APP_ROUTES.user.record_activity}
		icon="album"
		class={iconClasses}
	/>
	<div class="vl" />

	<AppLink route={playerSummaryRoute} icon="person" class={iconClasses} />
</div>

<style lang="scss">
	.sticky-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2rem;
		background-color: black;
		color: white;
		display: flex;
		align-content: center;
		align-items: center;
		justify-content: space-evenly;
	}

	.vl {
		height: 100%;
		background-color: white;
		width: 1px;
	}

	.slide-in-from-bottom {
		animation: 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94) 0s 1 SlideUp;
	}

	@keyframes SlideUp {
		0% {
			transform: translate3d(0, 100%, 0);
		}
		100% {
			transform: translateZ(0);
		}
	}
</style>
