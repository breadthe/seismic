import { feedDownloadError, fetchingFeed, feedData, lastFetchedAt, refreshIntervalTimer, lastNotifiedEarthquakeCode } from './store'
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification'
import { round1, timestampToLocalString } from "./utils"
import type { Feature } from './types'

export const fetchFeed = async function () {
    const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson'

    feedDownloadError.set('')

    try {
        const response = await fetch(url)

        if (response.status !== 200) {
            feedDownloadError.set('Could not download')
            return
        }

        const json = await response.json()
        feedData.set(json)

        // Trigger a desktop notification with the new earthquake
        notifyDesktop(json.features[0])

        lastFetchedAt.set(Date.now())
    } catch (error) {
        feedDownloadError.set('Network error')
        console.error(error)
    }
}

export const refreshFeed = async function () {
    fetchingFeed.set(true)

    await fetchFeed()

    setTimeout(() => {
        fetchingFeed.set(false)
    }, 1000)
}

export const startFeedRefreshInterval = function (seconds: number) {
    const interval = setInterval(async () => {
        await refreshFeed()
    }, 1000 * seconds)

    refreshIntervalTimer.set(interval)
}

function notifyDesktop(newEarthquake: Feature) {
    // Don't notify if the earthquake is the same as the last notified one
    if (localStorage.getItem('lastNotifiedEarthquakeCode') && localStorage.getItem('lastNotifiedEarthquakeCode').toString() === newEarthquake.properties.code) {
        return
    }

    // Save the new earthquake code to avoid duplicate notifications
    lastNotifiedEarthquakeCode.set(newEarthquake.properties.code)

    const message = `${round1(newEarthquake.properties.mag)} magnitude ${newEarthquake.properties.place} at ${timestampToLocalString(newEarthquake.properties.time)}`
    notification(message)
}

async function notification(text: string) {
    let permissionGranted = await isPermissionGranted();
    if (!permissionGranted) {
        const permission = await requestPermission();
        permissionGranted = permission === 'granted';
    }
    if (permissionGranted) {
        sendNotification({
            title: 'Seismic',
            body: text,
        });
    }
}
