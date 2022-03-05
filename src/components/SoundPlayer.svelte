<script lang="ts">
	import { active_key } from "@stores/ActiveKey";
	import { is_muted } from "@stores/Muted";

	active_key.subscribe((key) => {
		if (key && !$is_muted) {
			key.audio.play();
		}
	});
</script>
