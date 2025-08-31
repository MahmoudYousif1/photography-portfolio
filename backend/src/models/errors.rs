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
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(match self {
            Self::FileNotFound => "File not found",
            Self::JsonParseError => "JSON parse error",
            Self::PhotoNotFound => "Photo not found",
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
        };

        HttpResponse::build(status_code).json(ErrorResponse {
            error: error_type,
            message,
            code: status_code.as_u16(),
        })
    }
}

pub type AppResult<T> = Result<T, AppError>;
