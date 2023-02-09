<script lang="ts">
  import {
    feedDownloadError,
    fetchingFeed,
    feedData,
    lastFetchedAt,
    activeSection,
    theme,
    refreshInterval,
  } from "./store"
  import { tooltip } from "./tooltip"
  import { round1, diffForHumans, timestampToLocalString, setTheme, setIsDark } from "./utils"

  let selectedTheme = $theme

  const preferences = {
    themes: [
      { label: "Follow OS preference", value: "automatic" },
      { label: "Light", value: "light" },
      { label: "Dark", value: "dark" },
    ],
  }

  function saveTheme() {
    $theme = selectedTheme
    setTheme($theme)
  }

  function closeSettings() {
    activeSection.set("Main")
  }
</script>

<main class="w-full overflow-hide">
  <header class="sticky top-0 z-10 bg-gray-100">
    <div class="flex items-center justify-between gap-4 p-2 ">
      <button
        on:click={closeSettings}
        use:tooltip={{ theme: "dark-border" }}
        title="Close Settings"
        class="flex items-center gap-1 text-xl font-extrabold text-indigo-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg
        >
      </button>
      <h1 class="font-extrabold text-indigo-800">
        Settings
      </h1>
    </div>
  </header>

  <section class="w-full h-full bg-white">
    <!-- Theme -->
    <div class="w-full flex items-center gap-4 border-b p-2">
      <div class="w-1/2">
        <h2 class="font-bold text-right">Theme</h2>
      </div>
      <div class="w-1/2">
        <select bind:value={selectedTheme} on:change={saveTheme}>
          {#each preferences.themes as theme}
            <option value={theme.value}>{theme.label}</option>
          {/each}
        </select>
      </div>
    </div>

    <!-- Feed refresh interval -->
    <div class="w-full flex items-center gap-4 border-b p-2">
      <div class="w-1/2">
        <h2 class="font-bold text-right">Feed refresh interval</h2>
      </div>
      <div class="w-1/2">
        {$refreshInterval}s
      </div>
    </div>
  </section>
</main>

<style>
</style>
