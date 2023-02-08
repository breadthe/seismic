import { writable } from 'svelte/store'
import type { FeatureCollection } from './types'

export const feedDownloadError = writable('')
export const fetchingFeed = writable(false) // true when fetching feed
export const feedData = writable<FeatureCollection>(undefined)
export const lastFetchedAt = writable(0) // timestamp for last feed fetch
