use crate::models::errors::{AppError, AppResult};
use crate::models::photo_info::{Photo, PhotoDataStore};

/// Retrieves a single photo by its ID from the photo store
pub fn get_photo_by_id<'a>(
    photo_store: &'a PhotoDataStore,
    photo_id: &'a str,
) -> AppResult<&'a Photo> {
    photo_store
        .photos
        .iter()
        .find(|photo| photo.id == photo_id)
        .ok_or(AppError::PhotoNotFound)
}
