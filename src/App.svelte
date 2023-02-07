<script lang="ts">
  import type { FeatureCollection } from "./types"

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
      console.log(quakeData)

      if (response.status !== 200) {
        downloadError = "Could not download"
        console.error("Error response from USGS", quakeData)
        return
      }
    } catch (error) {
      downloadError = "Network error"
      console.error(error)
    }
  }
</script>

<main class="w-full h-full">
  <div class="flex items-center gap-4 p-2">
    <button
      on:click={refreshData}
      class="text-xl font-extrabold bg-gradient-to-br from-blue-600 to-indigo-800 hover:opacity-90 bg-clip-text text-transparent"
    >
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
    <div class="w-full bg-white">
      {#each quakeData.features as quake}
        <div class="flex items-center gap-4 p-2 border-b hover:bg-gray-100">
          <div>
            <span class:font-bold={quake.properties.mag >= 4.5} class:text-red-600={quake.properties.mag >= 7}>
              {quake.properties.mag}
            </span>
          </div>
          <div>
            <p class="font-bold" class:text-red-600={quake.properties.mag >= 7}>
              {quake.properties.place}
            </p>
            <small class="font-xs text-gray-600">{new Date(quake.properties.time).toLocaleString()}</small>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</main>

<style>
</style>
