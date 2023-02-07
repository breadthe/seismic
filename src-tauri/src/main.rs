#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{AboutMetadata, Manager, Menu, MenuItem, Submenu};
use tauri::{SystemTray, SystemTrayEvent, PhysicalPosition};
fn main() {
    const APP_NAME: &str = env!("CARGO_PKG_NAME");
    const VERSION: &str = env!("CARGO_PKG_VERSION");
    const AUTHORS: &str = env!("CARGO_PKG_AUTHORS");
    const LICENSE: &str = env!("CARGO_PKG_LICENSE");
    const REPOSITORY: &str = env!("CARGO_PKG_REPOSITORY");

    let about_metadata = AboutMetadata::new()
        .version(VERSION)
        .authors(vec![AUTHORS.to_string()])
        .website(REPOSITORY)
        .license(LICENSE);

    let about_menu = Submenu::new(
        "App",
        Menu::new()
            .add_native_item(MenuItem::About(
                APP_NAME.to_string(),
                about_metadata,
            ))
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Hide)
            .add_native_item(MenuItem::HideOthers)
            .add_native_item(MenuItem::ShowAll)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Quit),
    );

    let edit_menu = Submenu::new(
        "Edit",
        Menu::new()
            .add_native_item(MenuItem::Undo)
            .add_native_item(MenuItem::Redo)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Cut)
            .add_native_item(MenuItem::Copy)
            .add_native_item(MenuItem::Paste)
            .add_native_item(MenuItem::SelectAll),
    );

    let view_menu = Submenu::new(
        "View",
        Menu::new().add_native_item(MenuItem::EnterFullScreen),
    );

    let window_menu = Submenu::new(
        "Window",
        Menu::new()
            .add_native_item(MenuItem::Minimize)
            .add_native_item(MenuItem::Zoom),
    );

    let menu = Menu::new()
        .add_submenu(about_menu)
        .add_submenu(edit_menu)
        .add_submenu(view_menu)
        .add_submenu(window_menu);

    // ------------------------------ System Tray (toggle app visibility on click in the system tray) ------------------------------ //
    let system_tray = SystemTray::new();

    tauri::Builder::default()
        .menu(menu)
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick {
                position,
                size,
                ..
            } => {
                let window = app.get_window("main").unwrap();

                let is_visible = window.is_visible().unwrap();

                if is_visible {
                    window.hide().unwrap();
                } else {
                    let window_size  = window.outer_size().unwrap();
                    let physical_pos = PhysicalPosition {
                      x: position.x as i32 + (size.width as i32 / 2) - (window_size.width as i32 / 2),
                      y: position.y as i32 - window_size.height as i32
                    };

                    let _ = window.set_position(tauri::Position::Physical(physical_pos));
                    window.show().unwrap();
                    window.set_focus().unwrap();
                }
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
