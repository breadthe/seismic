<script lang="ts">
  import appLogo from "./assets/128x128@2x.png"
  import { feedDownloadError, fetchingFeed, feedData } from "./store"
  import { tooltip } from "./tooltip"
  import { refreshFeed } from "./feed"
  import SettingsButton from "./lib/SettingsButton.svelte"
</script>

  <header class="sticky top-0 z-10 bg-gray-100 dark:bg-gray-900">
    <div class="flex items-center justify-between gap-4 p-2">
      <button
        on:click={refreshFeed}
        use:tooltip={{ theme: "dark-border" }}
        title="Click to refresh"
        class="flex items-center gap-1 text-xl font-extrabold bg-gradient-to-br from-blue-600 to-indigo-600 hover:opacity-90 bg-clip-text text-transparent"
      >
        <img src={appLogo} alt="Seismic logo" width="24" />
        Seismic
      </button>

      {#if $fetchingFeed}
        <small class="text-xs text-gray-600 dark:text-gray-400">fetching data...</small>
      {/if}

      {#if $feedDownloadError}
        <small class="text-xs text-red-600">{$feedDownloadError}</small>
      {/if}

      <!-- <small class="text-xs text-gray-600 dark:text-gray-400" title={timestampToLocalString($lastFetchedAt)}>
        {diffForHumans($lastFetchedAt)}
      </small> -->

      <SettingsButton />
    </div>

    {#if $feedData && $feedData.type === "FeatureCollection"}
      <div class="w-full bg-white dark:bg-gray-800 p-2 text-sm border-b dark:border-gray-600">
        {$feedData.metadata.title} - <small class="font-bold text-xs">{$feedData.metadata.count}</small> events
      </div>
    {/if}
  </header>


<style>
</style>
