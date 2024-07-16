#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

pub mod monitor;
pub mod native;

use crate::monitor::{
    battery_info, cpu_info, memory_info, process_info, system_info, update_tray_title,
};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            system_info,
            battery_info,
            cpu_info,
            process_info,
            memory_info,
            update_tray_title,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
