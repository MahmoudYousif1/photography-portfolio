use crate::models::errors::{AppError, AppResult};
use crate::models::photo_info::{Photo, PhotoDataStore};
use std::{fs, sync::Arc};

pub fn load_photo_data_once(photo_data_path: &str) -> AppResult<PhotoDataStore> {
    let file_content = fs::read_to_string(photo_data_path).map_err(|_| AppError::FileNotFound)?;

    Ok(PhotoDataStore {
        photos: Arc::new(
            serde_json::from_str::<Vec<Photo>>(&file_content)
                .map_err(|_| AppError::JsonParseError)?,
        ),
    })
}
