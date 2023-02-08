import { writable } from 'svelte/store'
import type { FeatureCollection } from './types'

export const feedDownloadError = writable('')
export const fetchingFeed = writable(false)
export const feedData = writable<FeatureCollection>(undefined)
