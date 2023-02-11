<script lang="ts">
  import {
    activeSection,
    theme,
    DEFAULT_REFRESH_INTERVAL,
    refreshInterval,
    refreshIntervalTimer,
    DEFAULT_MAGNITUDE_NOTIFICATION_THRESHOLD,
    magnitudeNotificationThreshold,
  } from "./store"
  import { startFeedRefreshInterval } from "./feed"
  import { tooltip } from "./tooltip"
  import { setTheme } from "./utils"

  let selectedTheme = $theme

  $: newRefreshInterval = $refreshInterval
  $: newMagnitudeNotificationThreshold = $magnitudeNotificationThreshold

  $: refreshIntervalChanged = newRefreshInterval !== $refreshInterval
  $: magnitudeNotificationThresholdChanged = newMagnitudeNotificationThreshold !== $magnitudeNotificationThreshold
  $: disabled = !refreshIntervalChanged && !magnitudeNotificationThresholdChanged

  const preferences = {
    themes: [
      { label: "Follow OS preference", value: "automatic" },
      { label: "Light", value: "light" },
      { label: "Dark", value: "dark" },
    ],
  }

  function saveTheme() {
    theme.set(selectedTheme)
    setTheme($theme)
  }

  function saveSettings() {
    if (refreshIntervalChanged) {
      refreshInterval.set(newRefreshInterval || DEFAULT_REFRESH_INTERVAL)

      // clear the feed refresh interval and start a new one
      clearInterval($refreshIntervalTimer)
      startFeedRefreshInterval($refreshInterval)
    }

    if (magnitudeNotificationThresholdChanged) {
      magnitudeNotificationThreshold.set(newMagnitudeNotificationThreshold || DEFAULT_MAGNITUDE_NOTIFICATION_THRESHOLD)
    }
  }

  function closeSettings() {
    activeSection.set("Main")
  }
</script>

<main class="w-full overflow-hide">
  <header class="sticky top-0 z-10 bg-gray-100 dark:bg-gray-900">
    <div class="flex items-center justify-between gap-4 px-4 py-2">
      <button
        on:click={closeSettings}
        use:tooltip={{ theme: "dark-border" }}
        title="Close Settings"
        class="text-2xl text-blue-600 hover:opacity-90"
      >
        &times;
      </button>

      <h1 class="font-bold">Settings</h1>
    </div>
  </header>

  <section class="w-full h-full flex flex-col gap-4">
    <!-- Theme -->
    <div class="mx-8 flex items-center gap-4 p-2 bg-white dark:bg-gray-800 rounded-lg">
      <div class="w-1/2">
        <h2 class="text-right">Theme</h2>
      </div>
      <div class="w-1/2">
        <select
          bind:value={selectedTheme}
          on:change={saveTheme}
          class="bg-white dark:bg-gray-800 appearance-none px-2 py-1 border dark:border-gray-600 rounded"
        >
          {#each preferences.themes as theme}
            <option value={theme.value}>{theme.label}</option>
          {/each}
        </select>
      </div>
    </div>

    <!-- Feed refresh interval + Magnitude notification threshold -->
    <div class="mx-8 rounded-lg">
      <!-- Feed refresh interval -->
      <div class="flex items-center gap-4 p-2 bg-white dark:bg-gray-800 rounded-t-lg">
        <div class="w-1/2">
          <h2 class="text-right">Feed refresh interval (s)</h2>
        </div>
        <div class="w-1/2">
          <input
            type="number"
            min="5"
            step="1"
            bind:value={newRefreshInterval}
            class="w-16 bg-white dark:bg-gray-800 border dark:border-gray-600 px-2 py-1 rounded"
          />
        </div>
      </div>

      <!-- Magnitude notification threshold -->
      <div class="flex items-center gap-4 p-2 bg-white dark:bg-gray-800">
        <div class="w-1/2">
          <h2 class="text-right">Magnitude notification threshold</h2>
        </div>
        <div class="w-1/2">
          <input
            type="number"
            min="2.5"
            max="10"
            step="0.1"
            bind:value={newMagnitudeNotificationThreshold}
            class="w-16 bg-white dark:bg-gray-800 border dark:border-gray-600 px-2 py-1 rounded"
          />
        </div>
      </div>

      <div class="text-right p-2 bg-white dark:bg-gray-800 border-t dark:border-gray-600 rounded-b-lg">
        <button
          on:click={saveSettings}
          class="text-sm bg-gradient-to-br from-blue-600 to-indigo-600 hover:opacity-90 disabled:opacity-50 text-white px-2 py-1 disabled:cursor-not-allowed rounded"
          {disabled}>Save</button
        >
      </div>
    </div>
  </section>
</main>

<style>
</style>
