# ![Seismic logo](https://user-images.githubusercontent.com/17433578/218228952-b6986241-6f32-4c31-8f14-d4069de78b01.png) Seismic

A taskbar app for displaying USGS magnitude 2.5+ earthquakes from the past day.

![Seismic screenshot](https://user-images.githubusercontent.com/17433578/218229169-6b451b87-5d85-4936-8404-6923bbbb8912.png)

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

[](#wishlist)

## Wishlist

Note that I may not implement all of these.

- <label><input type="checkbox" checked />Fetch the feed on startup.</label>
- <label><input type="checkbox" checked />Fetch the feed periodically (60s).</label>
- <label><input type="checkbox" checked />Configurable feed refresh frequency.</label>
- <label><input type="checkbox" checked />Desktop notifications for significant events (Mac only).</label>
- <label><input type="checkbox" checked />Configurable notification threshold.</label>
- <label><input type="checkbox" checked />Dark mode.</label>
- <label><input type="checkbox" checked />Open location in geojson.io map.</label>
- <label><input type="checkbox" />Optional color coding of events according to severity.</label>
- <label><input type="checkbox" />Timestamp for last feed refresh.</label>
- <label><input type="checkbox" />Display more event parameters from the feed (such as tsunami warning).</label>

[](#known_issues)

## Known issues

- Currently the GitHub action fails to build with an incomprehensible error.
- I have only tested this app on Mac. While I can make GitHub Actions generate builds for Windows and Linux, I can't guarantee they will work properly, especially the taskbar stuff. Feel free to contribute to those builds.

## Contributing

Contributing is welcome, but I keep in mind that I might be slow to respond.

Contribution priority:

- [known issues](#known_issues)
- bug fixes
- platform-specific builds (make it work great on Windows and Linux!)
- features on the [wishlist](#wishlist)
- everything else (including new ideas)

## License

[MIT](https://mit-license.org/)
