use crate::models::{errors::AppError, photo_info::PhotoDataStore};
use crate::utils::validate_image_paths::resolve_and_validate_image_path;
use actix_files::NamedFile;
use actix_web::{Result, web};
use log::warn;

pub async fn serve_image_by_id(
    path: web::Path<String>,
    photo_store: web::Data<PhotoDataStore>,
) -> Result<NamedFile, AppError> {
    let photo_id = path.into_inner();

    let photo = photo_store
        .photos
        .iter()
        .find(|p| p.id == photo_id)
        .ok_or(AppError::PhotoNotFound)?;

    let image_path = resolve_and_validate_image_path(&photo.filename)?;

    NamedFile::open(image_path).map_err(|e| {
        warn!("Failed to open image file for photo {}: {}", photo_id, e);
        AppError::ImageFileNotFound
    })
}
