<script lang="ts">
	export let fadeIn: boolean = false;
</script>

<!-- TODO: add proper loading spinner -->
<span class="spinner {fadeIn ? 'fade-in' : ''}">Loading...</span>

<style lang="scss">
	// TODO: convert this to tailwind
	// TODO: convert this to tailwind
	.spinner {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 1001;
		user-select: none;
	}

	.fade-in {
		animation: 3s ease-out 0s 1 FadeIn;
	}
	@keyframes FadeIn {
		0% {
			opacity: 0;
		}
		10% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
