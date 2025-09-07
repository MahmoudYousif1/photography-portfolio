use actix_web::{HttpResponse, ResponseError, http::StatusCode};
use serde::Serialize;
use std::fmt;

#[derive(Debug, Serialize)]
pub struct ErrorResponse {
    pub error: &'static str,
    pub message: &'static str,
    pub code: u16,
}

#[derive(Debug)]
pub enum AppError {
    FileNotFound,
    JsonParseError,
    PhotoNotFound,
    ImageFileNotFound,
    InvalidImagePath,
    PathTraversalAttempt,
    NotAnImage,
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(match self {
            Self::FileNotFound => "File not found",
            Self::JsonParseError => "JSON parse error",
            Self::PhotoNotFound => "Photo not found",
            Self::ImageFileNotFound => "Image file not found",
            Self::InvalidImagePath => "Invalid image path",
            Self::PathTraversalAttempt => "Path traversal attempt detected",
            Self::NotAnImage => "File is not an image",
        })
    }
}

impl ResponseError for AppError {
    fn error_response(&self) -> HttpResponse {
        let (status_code, error_type, message) = match self {
            Self::FileNotFound => (
                StatusCode::NOT_FOUND,
                "FILE_NOT_FOUND",
                "The requested file could not be found",
            ),
            Self::JsonParseError => (
                StatusCode::INTERNAL_SERVER_ERROR,
                "JSON_PARSE_ERROR",
                "Failed to parse JSON data",
            ),
            Self::PhotoNotFound => (StatusCode::NOT_FOUND, "PHOTO_NOT_FOUND", "No photos found"),
            Self::ImageFileNotFound => (
                StatusCode::NOT_FOUND,
                "IMAGE_FILE_NOT_FOUND",
                "The image file could not be located on disk",
            ),
            Self::InvalidImagePath => (
                StatusCode::BAD_REQUEST,
                "INVALID_IMAGE_PATH",
                "The image path is invalid",
            ),
            Self::PathTraversalAttempt => (
                StatusCode::BAD_REQUEST,
                "INVALID_REQUEST",
                "Path traversal attempts are not allowed",
            ),
            Self::NotAnImage => (
                StatusCode::BAD_REQUEST,
                "NOT_AN_IMAGE",
                "The requested file is not a valid image",
            ),
        };

        HttpResponse::build(status_code).json(ErrorResponse {
            error: error_type,
            message,
            code: status_code.as_u16(),
        })
    }
}

pub type AppResult<T> = Result<T, AppError>;
