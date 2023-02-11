<script>
  import { onMount } from "svelte"
  import { getVersion, getName } from '@tauri-apps/api/app';
  import { appVersion, appName, activeSection, refreshInterval, refreshIntervalTimer } from "./store"
  import { refreshFeed, startFeedRefreshInterval } from "./feed"
  import Main from "./Main.svelte"
  import Settings from "./Settings.svelte"
  import Theme from "./Theme.svelte"

  const sections = [
    { id: "Main", component: Main },
    { id: "Settings", component: Settings },
  ]

  onMount(async () => {
    appVersion.set(await getVersion())
    appName.set(await getName())

    await refreshFeed()

    startFeedRefreshInterval($refreshInterval)

    return () => {
      clearInterval($refreshIntervalTimer)
    }
  })
</script>

<main id="root" class="min-h-screen bg-gray-100 dark:bg-gray-900">
  <!-- Dynamic section based on activeSection -->
  <svelte:component this={sections.find((s) => s.id === $activeSection).component} />

  <!-- Renderless, conditionally sets "dark" class on the html element -->
  <Theme />
</main>

<style>
</style>
