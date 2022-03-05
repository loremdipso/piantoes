<script lang="ts">
	import SimpleMenu from "smelte/src/components/SimpleMenu";

	import AppLink from "@components/common/AppLink.svelte";

	import DarkModeButton from "@components/common/DarkModeButton.svelte";
	import MiniAvatar from "@components/player/MiniAvatar.svelte";

	import { API_ROUTES, APP_ROUTES } from "@config/Routes";

	import {
		logged_in_status,
		LoggedInState,
		profile_pic_slug,
	} from "@stores/Player";

	const menuItemClasses = "p-4 hover:bg-gray-200 dark-hover:bg-blue-200";

	let open = false;
</script>

<div class="flex">
	{#if $logged_in_status === LoggedInState.LOGGED_IN}
		<SimpleMenu bind:open>
			<div slot="activator">
				<button on:click={() => (open = !open)} class="px-4 py-2 flex">
					<MiniAvatar slug={$profile_pic_slug} />
				</button>
			</div>

			<div slot="menu" class="w-auto flex flex-col">
				<AppLink
					on:click={() => (open = !open)}
					route={APP_ROUTES.user.settings}
					class={menuItemClasses}
				/>

				<hr />

				<DarkModeButton verbose class={menuItemClasses} />

				<hr />

				<a href={API_ROUTES.get.login.logout} class={menuItemClasses}>
					Sign out
				</a>
			</div>
		</SimpleMenu>
	{:else}
		<AppLink route={APP_ROUTES.login.signup} class="mx-1" />
		<AppLink route={APP_ROUTES.login.login} class="mx-1" />
	{/if}
</div>
