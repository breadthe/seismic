import { writable } from 'svelte/store'
import type { FeatureCollection } from './types'

// Page (Main, Settings)
export const activeSection = writable('Main');

// App version + name
export const appVersion = writable<string|null>(null);
export const appName = writable<string|null>(null);

// Theme: dark, light, automatic
const storedTheme = localStorage.getItem('theme') || 'light'
export const theme = writable(storedTheme ? storedTheme : 'light')
theme.subscribe((value: string) => {
    localStorage.setItem('theme', value)
})

// Feed refresh interval, default 60 seconds
export const DEFAULT_REFRESH_INTERVAL: number = 60
const storedRefreshInterval: number = parseInt(localStorage.getItem('refreshInterval'), 10) || DEFAULT_REFRESH_INTERVAL
export const refreshInterval = writable<number>(storedRefreshInterval ? storedRefreshInterval : DEFAULT_REFRESH_INTERVAL)
refreshInterval.subscribe((value: number) => {
    localStorage.setItem('refreshInterval', value.toString())
})

// Feed refresh interval, default 60 seconds
export const DEFAULT_MAGNITUDE_NOTIFICATION_THRESHOLD: number = 2.5
const storedMagnitudeNotificationThreshold: number = parseFloat(localStorage.getItem('magnitudeNotificationThreshold')) || DEFAULT_MAGNITUDE_NOTIFICATION_THRESHOLD
export const magnitudeNotificationThreshold = writable<number>(storedMagnitudeNotificationThreshold ? storedMagnitudeNotificationThreshold : DEFAULT_MAGNITUDE_NOTIFICATION_THRESHOLD)
magnitudeNotificationThreshold.subscribe((value: number) => {
    localStorage.setItem('magnitudeNotificationThreshold', value.toString())
})

// Refresh interval timer
export const refreshIntervalTimer = writable<NodeJS.Timeout>(undefined)

export const feedDownloadError = writable('')
export const fetchingFeed = writable(false) // true when fetching feed
export const feedData = writable<FeatureCollection>(undefined)
export const lastFetchedAt = writable(0) // timestamp for last feed fetch

// Save the last notified earthquake code to avoid duplicate notifications
const storedLastNotifiedEarthquakeCode = localStorage.getItem('lastNotifiedEarthquakeCode')
export const lastNotifiedEarthquakeCode = writable<string>(storedLastNotifiedEarthquakeCode)
lastNotifiedEarthquakeCode.subscribe((value: string) => {
    localStorage.setItem('lastNotifiedEarthquakeCode', value)
})
