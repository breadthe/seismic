import { mkdirSync, existsSync, copyFileSync } from "fs"
import { platform } from "os"
import json from "../package.json" assert { type: "json" }

const os = platform()
const version = json.version

if (!existsSync("./src-tauri/target/release/upload")) {
    mkdirSync("./src-tauri/target/release/upload")
}

if (os === "win32") {
    try {
        copyFileSync(`./src-tauri/target/release/bundle/msi/Seismic_${version}_x64_en-US.msi`, `./src-tauri/target/release/upload/seismic-${version}-windows-x64.msi`)
        copyFileSync(`./src-tauri/target/release/bundle/msi/Seismic_${version}_x64_en-US.msi.zip`, `./src-tauri/target/release/upload/seismic-${version}-windows-x64.zip`)
        copyFileSync(`./src-tauri/target/release/bundle/msi/Seismic_${version}_x64_en-US.msi.zip.sig`, `./src-tauri/target/release/upload/seismic-${version}-windows-x64.sig`)
    } catch (err) {
        console.log("File not found")
    }
} else if (os === "darwin") {
    try {
        copyFileSync(`./src-tauri/target/release/bundle/dmg/Seismic_${version}_x64.dmg`, `./src-tauri/target/release/upload/seismic-${version}-macos-x64.dmg`)
        copyFileSync("./src-tauri/target/release/bundle/macos/Seismic.app.tar.gz", `./src-tauri/target/release/upload/seismic-${version}-macos-x64.tar.gz`)
        copyFileSync("./src-tauri/target/release/bundle/macos/Seismic.app.tar.gz.sig", `./src-tauri/target/release/upload/seismic-${version}-macos-x64.sig`)
    } catch (err) {
        console.log("File not found")
    }
} else {
    try {
        copyFileSync(`./src-tauri/target/release/bundle/appimage/seismic_${version}_amd64.AppImage`, `./src-tauri/target/release/upload/seismic-${version}-linux-x64.appimage`)
        copyFileSync(`./src-tauri/target/release/bundle/appimage/seismic_${version}_amd64.AppImage.tar.gz`, `./src-tauri/target/release/upload/seismic-${version}-linux-x64.tar.gz`)
        copyFileSync(`./src-tauri/target/release/bundle/appimage/seismic_${version}_amd64.AppImage.tar.gz.sig`, `./src-tauri/target/release/upload/seismic-${version}-linux-x64.sig`)
        copyFileSync(`./src-tauri/target/release/bundle/deb/seismic_${version}_amd64.deb`, `./src-tauri/target/release/upload/seismic-${version}-linux-x64.deb`)
    } catch (err) {
        console.log("File not found")
    }
}
