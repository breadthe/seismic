# ![Seismic logo](https://user-images.githubusercontent.com/17433578/217473060-d8941828-8e8e-48cb-b186-c6c003597a34.png) Seismic

A taskbar app for displaying USGS magnitude 2.5+ earthquakes from the past day.

![Seismic screenshot](https://user-images.githubusercontent.com/17433578/217620324-88eeea39-d1b7-4a94-9924-bf5d08f17f5e.png)

It mimics the [official page](https://earthquake.usgs.gov/earthquakes/map/?extent=-89.76681,-400.78125&extent=89.76681,210.23438&map=false) on the desktop. The data is provided by the [USGS earthquake feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson).

Seismic is offered free of charge, and is open-source.

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

## Wishlist

Note that I may not implement all of these.

- Fetch the feed on startup.
- Fetch the feed periodically.
- Configurable fetch frequency.
- Desktop notifications for significant events.
- Configurable notification threshold.
- Dark mode.
- Display more event parameters from the feed (such as tsunami warning).

## Known issues

- I have only tested this app on Mac. While I can make GitHub Actions generate builds for Windows and Linux, I can't guarantee they will work properly, especially the taskbar stuff. Feel free to contribute to those builds.

## Contributing

Contributing is welcome, but I keep in mind that I might be slow to respond.

Contribution priority:

- bug fixes
- platform-specific builds (make it work great on Windows and Linux!)
- features on the Wishlist
- everything else (including new ideas)

## License

[MIT](https://mit-license.org/)
