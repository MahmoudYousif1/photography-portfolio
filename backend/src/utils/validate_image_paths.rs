use crate::models::errors::AppError;
use std::path::{Path, PathBuf};

pub fn resolve_and_validate_image_path(filename: &str) -> Result<PathBuf, AppError> {
    let clean_filename = filename.strip_prefix("resources/").unwrap_or(filename);
    let full_path = PathBuf::from("resources").join(clean_filename);

    let canonical_path = full_path
        .canonicalize()
        .map_err(|_| AppError::ImageFileNotFound)?;

    let canonical_base = PathBuf::from("resources")
        .canonicalize()
        .map_err(|_| AppError::InvalidImagePath)?;

    if !canonical_path.starts_with(&canonical_base) {
        return Err(AppError::PathTraversalAttempt);
    }

    if !canonical_path.is_file() {
        return Err(AppError::ImageFileNotFound);
    }

    if !is_image_file(&canonical_path) {
        return Err(AppError::NotAnImage);
    }

    Ok(canonical_path)
}

fn is_image_file(path: &Path) -> bool {
    path.extension()
        .and_then(|ext| ext.to_str())
        .map(|ext| {
            matches!(
                ext.to_lowercase().as_str(),
                "jpg" | "jpeg" | "png" | "gif" | "webp" | "bmp" | "tiff" | "tif"
            )
        })
        .unwrap_or(false)
}
