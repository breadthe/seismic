import { feedDownloadError, fetchingFeed, feedData, lastFetchedAt, refreshIntervalTimer } from './store'

export const fetchFeed = async function () {
    const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson'

    feedDownloadError.set('')

    try {
        const response = await fetch(url)

        feedData.set(await response.json())

        if (response.status !== 200) {
            feedDownloadError.set('Could not download')
            return
        }

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
