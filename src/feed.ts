import { feedDownloadError, fetchingFeed, feedData } from './store'

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
    } catch (error) {
        feedDownloadError.set('Network error')
        console.error(error)
    }
}
