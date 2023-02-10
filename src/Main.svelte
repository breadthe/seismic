<script lang="ts">
  import appLogo from "./assets/128x128@2x.png"
  import { feedDownloadError, fetchingFeed, feedData } from "./store"
  import { tooltip } from "./tooltip"
  import { refreshFeed } from "./feed"
  import { round1, timestampToLocalString } from "./utils"
  import SettingsButton from "./lib/SettingsButton.svelte"
</script>

<main class="w-full overflow-hide">
  <header class="sticky top-0 z-10 bg-gray-100 dark:bg-gray-900">
    <div class="flex items-center justify-between gap-4 px-4 py-2">
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

  {#if $feedData && $feedData.type === "FeatureCollection"}
    <div class="w-full h-full min-h-screen bg-white dark:bg-gray-800">
      {#each $feedData.features as feature (feature.properties.code)}
        <div
          class="flex items-center justify-between border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-900 p-2"
        >
          <div class="w-full flex items-center gap-4">
            <div class="w-8 text-center">
              <span class:font-bold={feature.properties.mag >= 4.5} class:text-red-600={feature.properties.mag >= 7}>
                {round1(feature.properties.mag)}
              </span>
            </div>
            <div class="flex-1">
              <p class:font-bold={feature.properties.mag >= 4.5} class:text-red-600={feature.properties.mag >= 7}>
                {feature.properties.place}
              </p>
              <small class="text-xs text-gray-600 dark:text-gray-400">{timestampToLocalString(feature.properties.time)}</small>
            </div>
          </div>

          <div class="w-24 text-right">
            <small class="text-xs text-gray-600 dark:text-gray-400" title="Depth">
              {round1(feature.geometry.coordinates[2])} km
            </small>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <p class="mt-36 text-center text-gray-600 dark:text-gray-400">💡 click the logo to refresh earthquake data</p>
  {/if}
</main>

<style>
</style>
