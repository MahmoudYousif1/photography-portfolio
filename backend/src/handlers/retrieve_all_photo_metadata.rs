use crate::models::errors::{AppError, AppResult};
use crate::models::photo_info::PhotoDataStore;
use actix_web::{HttpResponse, web};

pub async fn get_all_photo_data(photo_store: web::Data<PhotoDataStore>) -> AppResult<HttpResponse> {
    if photo_store.photos.is_empty() {
        return Err(AppError::PhotoNotFound);
    }
    Ok(HttpResponse::Ok().json(photo_store.photos.as_ref()))
}