<script lang="ts">
  import appLogo from "./assets/128x128@2x.png"
  import type { FeatureCollection } from "./types"
  import { tooltip } from "./tooltip"

  const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson"
  let downloadError = ""
  let loading = false
  let quakeData: FeatureCollection | undefined = undefined

  async function refreshData() {
    loading = true
    await innerDownload()
    loading = false
  }

  async function innerDownload() {
    downloadError = ""
    try {
      const response = await fetch(url)

      quakeData = await response.json()

      if (response.status !== 200) {
        downloadError = "Could not download"
        return
      }
    } catch (error) {
      downloadError = "Network error"
      console.error(error)
    }
  }

  // Round a number to 1 decimal
  function round1(num: number): number {
    return Math.round(num * 10) / 10
  }
</script>

<main class="w-full overflow-hide">
  <header class="sticky top-0 z-10 bg-gray-100">
    <div class="flex items-center gap-4 p-2 ">
      <button
        on:click={refreshData}
        use:tooltip={{ theme: "dark-border" }}
        title="Click to refresh"
        class="flex items-center gap-1 text-xl font-extrabold bg-gradient-to-br from-blue-600 to-indigo-800 hover:opacity-90 bg-clip-text text-transparent"
      >
        <img src={appLogo} alt="Seismic logo" width="24" />
        Seismic
      </button>

      {#if loading}
        <small class="font-xs text-gray-600">fetching data...</small>
      {/if}

      {#if downloadError}
        <small class="font-xs text-red-600">{downloadError}</small>
      {/if}
    </div>

    {#if quakeData && quakeData.type === "FeatureCollection"}
      <div class="w-full bg-white p-2 text-sm border-b">
        {quakeData.metadata.title} - <small class="font-bold text-xs">{quakeData.metadata.count}</small> events
      </div>
    {/if}
  </header>

  {#if quakeData && quakeData.type === "FeatureCollection"}
    <div class="w-full h-full min-h-screen bg-white">
      {#each quakeData.features as feature}
        <div class="flex items-center justify-between border-b hover:bg-gray-100 p-2">
          <div class="w-full flex items-center gap-4">
            <div class="w-8">
              <span class:font-bold={feature.properties.mag >= 4.5} class:text-red-600={feature.properties.mag >= 7}>
                {round1(feature.properties.mag)}
              </span>
            </div>
            <div class="flex-1">
              <p class="font-bold" class:text-red-600={feature.properties.mag >= 7}>
                {feature.properties.place}
              </p>
              <small class="font-xs text-gray-600">{new Date(feature.properties.time).toLocaleString()}</small>
            </div>
          </div>

          <div class="w-24 text-right">
            <small class="font-xs text-gray-600" title="Depth">
              {round1(feature.geometry.coordinates[2])} km
            </small>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <p class="mt-36 text-center text-gray-600">💡 click the logo to refresh earthquake data</p>
  {/if}
</main>

<style>
</style>
