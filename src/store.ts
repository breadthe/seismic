import { readable, writable } from 'svelte/store'
import type { FeatureCollection } from './types'

// Page (Main, Settings)
export const activeSection = writable('Main');

// Theme: dark, light, automatic
const storedTheme = localStorage.getItem('theme') || 'light'
export const theme = writable(storedTheme ? storedTheme : 'light')
theme.subscribe((value: string) => {
    localStorage.setItem('theme', value)
})

// Feed refresh interval, default 60 seconds
export const DEFAULT_REFRESH_INTERVAL = 60
const storedRefreshInterval = parseInt(localStorage.getItem('refreshInterval'), 10) || DEFAULT_REFRESH_INTERVAL
export const refreshInterval = writable<number>(storedRefreshInterval ? storedRefreshInterval : DEFAULT_REFRESH_INTERVAL)
refreshInterval.subscribe((value: number) => {
    localStorage.setItem('refreshInterval', value.toString())
})

// Refresh interval timer
export const refreshIntervalTimer = writable<NodeJS.Timeout>(undefined)

export const feedDownloadError = writable('')
export const fetchingFeed = writable(false) // true when fetching feed
export const feedData = writable<FeatureCollection>(undefined)
export const lastFetchedAt = writable(0) // timestamp for last feed fetch
