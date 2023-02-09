import { writable } from 'svelte/store'
import type { FeatureCollection } from './types'

// Page (Main, Settings)
export const activeSection = writable('Main');

// Theme: dark, light, automatic
const storedTheme = localStorage.getItem('theme') || 'light'
export const theme = writable(storedTheme ? storedTheme : 'light')
theme.subscribe((value: string) => {
    localStorage.setItem('theme', value)
})

// Theme: dark, light, automatic
const storedRefreshInterval = localStorage.getItem('refreshInterval') || 60
export const refreshInterval = writable(storedRefreshInterval ? storedRefreshInterval : 60)
refreshInterval.subscribe((value: number) => {
    localStorage.setItem('refreshInterval', value.toString())
})

export const feedDownloadError = writable('')
export const fetchingFeed = writable(false) // true when fetching feed
export const feedData = writable<FeatureCollection>(undefined)
export const lastFetchedAt = writable(0) // timestamp for last feed fetch
