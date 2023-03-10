#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{AboutMetadata, Manager};
use tauri::{CustomMenuItem, PhysicalPosition, SystemTray, SystemTrayEvent, SystemTrayMenu};

#[cfg(target_os = "macos")]
use cocoa::appkit::{NSWindow, NSWindowButton, NSWindowStyleMask, NSWindowTitleVisibility};

#[cfg(target_os = "macos")]
use objc::runtime::YES;

use tauri::{Runtime, Window};

#[cfg(target_os = "macos")]
#[macro_use]
extern crate objc;

pub trait WindowExt {
    #[cfg(target_os = "macos")]
    fn set_transparent_titlebar(&self, title_transparent: bool, remove_toolbar: bool);
}

impl<R: Runtime> WindowExt for Window<R> {
    #[cfg(target_os = "macos")]
    fn set_transparent_titlebar(&self, title_transparent: bool, remove_tool_bar: bool) {
        unsafe {
            let id = self.ns_window().unwrap() as cocoa::base::id;
            NSWindow::setTitlebarAppearsTransparent_(id, cocoa::base::YES);
            let mut style_mask = id.styleMask();
            style_mask.set(
                NSWindowStyleMask::NSFullSizeContentViewWindowMask,
                title_transparent,
            );

            id.setStyleMask_(style_mask);

            if remove_tool_bar {
                let close_button = id.standardWindowButton_(NSWindowButton::NSWindowCloseButton);
                let _: () = msg_send![close_button, setHidden: YES];
                let min_button =
                    id.standardWindowButton_(NSWindowButton::NSWindowMiniaturizeButton);
                let _: () = msg_send![min_button, setHidden: YES];
                let zoom_button = id.standardWindowButton_(NSWindowButton::NSWindowZoomButton);
                let _: () = msg_send![zoom_button, setHidden: YES];
            }

            id.setTitleVisibility_(if title_transparent {
                NSWindowTitleVisibility::NSWindowTitleHidden
            } else {
                NSWindowTitleVisibility::NSWindowTitleVisible
            });

            id.setTitlebarAppearsTransparent_(if title_transparent {
                cocoa::base::YES
            } else {
                cocoa::base::NO
            });
        }
    }
}

fn main() {
    // const APP_NAME: &str = env!("CARGO_PKG_NAME");
    // const VERSION: &str = env!("CARGO_PKG_VERSION");
    // const AUTHORS: &str = env!("CARGO_PKG_AUTHORS");
    // const LICENSE: &str = env!("CARGO_PKG_LICENSE");
    // const REPOSITORY: &str = env!("CARGO_PKG_REPOSITORY");

    // let about_metadata = AboutMetadata::new()
    //     .version(VERSION)
    //     .authors(vec![AUTHORS.to_string()])
    //     .website(REPOSITORY)
    //     .license(LICENSE);

    // let about_menu = Submenu::new(
    //     "App",
    //     Menu::new()
    //         .add_native_item(MenuItem::About(APP_NAME.to_string(), about_metadata))
    //         .add_native_item(MenuItem::Separator)
    //         .add_native_item(MenuItem::Hide)
    //         .add_native_item(MenuItem::HideOthers)
    //         .add_native_item(MenuItem::ShowAll)
    //         .add_native_item(MenuItem::Separator)
    //         .add_native_item(MenuItem::Quit),
    // );

    // let edit_menu = Submenu::new(
    //     "Edit",
    //     Menu::new()
    //         .add_native_item(MenuItem::Undo)
    //         .add_native_item(MenuItem::Redo)
    //         .add_native_item(MenuItem::Separator)
    //         .add_native_item(MenuItem::Cut)
    //         .add_native_item(MenuItem::Copy)
    //         .add_native_item(MenuItem::Paste)
    //         .add_native_item(MenuItem::SelectAll),
    // );

    // let view_menu = Submenu::new(
    //     "View",
    //     Menu::new().add_native_item(MenuItem::EnterFullScreen),
    // );

    // let window_menu = Submenu::new(
    //     "Window",
    //     Menu::new()
    //         .add_native_item(MenuItem::Minimize)
    //         .add_native_item(MenuItem::Zoom),
    // );

    // let menu = Menu::new()
    //     .add_submenu(about_menu)
    //     .add_submenu(edit_menu)
    //     .add_submenu(view_menu)
    //     .add_submenu(window_menu);

    // ------------------------------ System Tray (toggle app visibility on click in the system tray) ------------------------------ //
    // let about = CustomMenuItem::new("about".to_string(), "About");
    let quit = CustomMenuItem::new("quit".to_string(), "Quit").accelerator("Cmd+Q");
    let tray_menu = SystemTrayMenu::new()
        // .add_item(about)
        // .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);
    let system_tray = SystemTray::new().with_menu(tray_menu);

    tauri::Builder::default()
        // .menu(menu)
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick { position, size, .. } => {
                let window = app.get_window("main").unwrap();

                let is_visible = window.is_visible().unwrap();

                if is_visible {
                    window.hide().unwrap();
                } else {
                    let window_size = window.outer_size().unwrap();
                    let physical_pos = PhysicalPosition {
                        x: position.x as i32 + (size.width as i32 / 2)
                            - (window_size.width as i32 / 2),
                        y: position.y as i32 - window_size.height as i32,
                    };

                    let _ = window.set_position(tauri::Position::Physical(physical_pos));
                    window.show().unwrap();
                    window.set_focus().unwrap();
                }
            }
            SystemTrayEvent::RightClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a right click");
            }
            SystemTrayEvent::DoubleClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a double click");
            }
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "about" => {
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

                    println!("{} {:?}", APP_NAME, about_metadata);

                    // @todo - show about dialog
                }
                "quit" => {
                    std::process::exit(0);
                }
                _ => {}
            },
            _ => {}
        })
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                // don't kill the app when the user clicks close. this is important
                event.window().hide().unwrap();
                api.prevent_close();
            }
            tauri::WindowEvent::Focused(false) => {
                // hide the window automatically when the user
                // clicks out. this is for a matter of taste.
                event.window().hide().unwrap();
            }
            _ => {}
        })
        .setup(|app| {
            #[cfg(target_os = "macos")]
            // don't show on the taskbar/springboard
            app.set_activation_policy(tauri::ActivationPolicy::Accessory);

            let window = app.get_window("main").unwrap();
            #[cfg(target_os = "macos")]
            window.set_transparent_titlebar(true, true);

            // this is a workaround for the window to always show in current workspace.
            // see https://github.com/tauri-apps/tauri/issues/2801
            window.set_always_on_top(true).unwrap();

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
