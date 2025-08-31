use serde::{Deserialize, Serialize};
use std::sync::Arc;

/// Core photo model representing individual photographs in the portfolio
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Photo {
    pub id: String,

    pub title: String,

    pub category: String,

    pub description: String,

    pub filename: String,

    #[serde(rename = "date-taken")]
    pub date_taken: String,

    #[serde(rename = "cameraInfo")]
    pub camera_info: CameraInfo,
}

/// Camera and technical information for a photograph
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CameraInfo {
    pub camera: String,

    pub lens: String,

    pub iso: u32,

    pub aperture: String,

    #[serde(rename = "shutterSpeed")]
    pub shutter_speed: String,

    #[serde(rename = "focalLength")]
    pub focal_length: String,
}

/// Thread-safe storage for photo metadata using Arc
#[derive(Debug, Clone)]
pub struct PhotoDataStore {
    pub photos: Arc<Vec<Photo>>,
}
