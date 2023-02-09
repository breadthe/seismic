<script lang="ts">
  import { setTheme, setIsDark } from "./utils"
  import { theme } from "./store"

  function handleTheme(node: HTMLElement) {
    const initialTheme = $theme
    setTheme(initialTheme)

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", listenToThemeChange)

    return {
      destroy() {
        window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", listenToThemeChange)
      },
    }
  }

  function listenToThemeChange(event) {
    if ($theme !== "automatic") {
      return
    }

    setIsDark(event.matches)
  }
</script>

<svelte:window use:handleTheme />
