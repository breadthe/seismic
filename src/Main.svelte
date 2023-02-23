<script lang="ts">
  import { feedData, magnitudeColorScale } from "./store"
  import { tooltip } from "./tooltip"
  import { round1, timestampToLocalString, magBgColor } from "./utils"
  import Header from "./Header.svelte"
</script>

<main class="w-full overflow-hide">
  <Header />

  {#if $feedData && $feedData.type === "FeatureCollection"}
    <div class="w-full h-full min-h-screen bg-white dark:bg-gray-800">
      {#each $feedData.features as feature (feature.properties.code)}
        <div
          class={`flex items-center justify-between border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-900 py-1 ${
            $magnitudeColorScale ? `${magBgColor(feature.properties.mag)} bg-opacity-20` : ""
          }`}
        >
          <!-- Magnitude -->
          <div
            class={`mx-2 w-8 h-8 flex items-center justify-center rounded-lg text-sm ${
              $magnitudeColorScale ? `${magBgColor(feature.properties.mag)} text-white` : ""
            }`}
            class:font-bold={feature.properties.mag >= 4.5 && !$magnitudeColorScale}
            class:text-red-600={feature.properties.mag >= 7 && !$magnitudeColorScale}
          >
            {round1(feature.properties.mag)}
          </div>

          <!-- Location -->
          <div class="flex-1 w-full flex flex-col">
            <p class="flex items-center gap-2">
              <span class:font-bold={feature.properties.mag >= 4.5} class:text-red-600={feature.properties.mag >= 7}
                >{feature.properties.place}</span
              >
              <a
                href={`http://geojson.io/#data=data:application/json,${encodeURIComponent(JSON.stringify(feature))}`}
                target="_blank"
                rel="noreferrer"
                class="text-blue-600"
                title="View on geojson.io"
                use:tooltip={{ theme: "dark-border" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg
                >
              </a>
            </p>
            <small class="text-xs text-gray-600 dark:text-gray-400">
              {timestampToLocalString(feature.properties.time)}
            </small>
          </div>

          <!-- Depth -->
          <div class="w-24 px-2 text-right">
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
