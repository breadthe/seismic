<script lang="ts">
  import { activeSection, theme, DEFAULT_REFRESH_INTERVAL, refreshInterval, refreshIntervalTimer } from "./store"
  import { startFeedRefreshInterval } from "./feed"
  import { tooltip } from "./tooltip"
  import { setTheme } from "./utils"

  let selectedTheme = $theme
  let refreshIntervalInput: HTMLInputElement

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

  function saveRefreshInterval() {
    refreshInterval.set(parseInt(refreshIntervalInput.value) || DEFAULT_REFRESH_INTERVAL)

    // clear the feed refresh interval and start a new one
    clearInterval($refreshIntervalTimer)
    startFeedRefreshInterval($refreshInterval)
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
        class="text-2xl text-indigo-800 hover:opacity-90"
      >
        &times;
      </button>

      <h1 class="font-bold">Settings</h1>
    </div>
  </header>

  <section class="w-full h-full bg-white dark:bg-gray-800">
    <!-- Theme -->
    <div class="w-full flex items-center gap-4 border-b dark:border-gray-600 p-2">
      <div class="w-1/2">
        <h2 class="font-bold text-right">Theme</h2>
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

    <!-- Feed refresh interval -->
    <div class="w-full flex items-center gap-4 border-b dark:border-gray-600 p-2">
      <div class="w-1/2">
        <h2 class="font-bold text-right">Feed refresh interval (s)</h2>
      </div>
      <div class="w-1/2">
        <input
          type="number"
          min="5"
          step="1"
          bind:this={refreshIntervalInput}
          value={$refreshInterval}
          class="w-16 bg-white dark:bg-gray-800 border dark:border-gray-600 px-2 py-1 rounded"
        />
        <button
          on:click={saveRefreshInterval}
          class="text-sm bg-gradient-to-br from-blue-600 to-indigo-800 hover:opacity-90 text-white px-2 py-1 rounded"
          >Save</button
        >
      </div>
    </div>
  </section>
</main>

<style>
</style>
