# ![Seismic logo](https://user-images.githubusercontent.com/17433578/218228952-b6986241-6f32-4c31-8f14-d4069de78b01.png) Seismic

A taskbar app for displaying USGS magnitude 2.5+ earthquakes from the past day.

![Seismic screenshot](https://user-images.githubusercontent.com/17433578/218282548-57895a1d-429c-4068-81d3-889448513c98.png)

It mimics the [official page](https://earthquake.usgs.gov/earthquakes/map/?extent=-89.76681,-400.78125&extent=89.76681,210.23438&map=false) on the desktop. The data is provided by the [USGS earthquake feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson).

Seismic is offered free of charge, and is open-source.

Download the latest release for your platform [here](https://github.com/breadthe/seismic/releases).

[](#features)

## Features

- Fetch the feed on startup.
- Fetch the feed periodically (60s)
- Configurable feed refresh frequency.
- Desktop notifications for significant events (Mac only)
- Configurable notification threshold.
- Dark mode.
- Open location in geojson.io map.
- Optional color coding of events according to severity.

## Stack

The app is built with:

- Back-end: [Tauri](https://tauri.app/)
- Front-end: [Svelte](https://svelte.dev/) + [Vite](https://vitejs.dev/)
- UI: [Tailwind CSS](https://tailwindcss.com/)
- Various packages (check `package.json`)

## Build

Install the [Tauri tooling](https://tauri.app/v1/guides/getting-started/setup) (includes Rust).

```shell
npm install

# build for development
cargo tauri dev

# build the production binary for your platform
cargo tauri build
```

[](#wishlist)

## Wishlist

All the [features](#features) intended for v1.0 are complete. The following are potential embellishments that may or may not happen.

- [ ] Timestamp for last feed refresh.
- [ ] Display more event parameters from the feed (such as tsunami warning).

[](#known_issues)

## Known issues

- I have only tested this app on Mac (Intel). While there are builds for all platforms (Mac/Windows/Linux), I can't guarantee the latter two will work properly, especially the behavior around the taskbar and desktop notification functionality. Feel free to contribute to those builds.

## Contributing

Contributing is welcome, but I keep in mind that I might be slow to respond.

Contribution priority:

- [known issues](#known_issues).
- bug fixes (open an issue first, explaining the problem).
- platform-specific builds (make it work great on Windows and Linux!).
- features on the [wishlist](#wishlist).
- everything else (including new ideas).

## License

[MIT](https://mit-license.org/)
