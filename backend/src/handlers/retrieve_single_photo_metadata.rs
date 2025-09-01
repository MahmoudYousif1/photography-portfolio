use crate::models::errors::AppResult;
use crate::models::photo_info::PhotoDataStore;
use crate::utils::retrieve_metadata_by_id::get_photo_by_id;
use actix_web::{HttpResponse, web};

pub async fn get_photo_by_id_handler(
    photo_store: web::Data<PhotoDataStore>,
    path: web::Path<String>,
) -> AppResult<HttpResponse> {
    Ok(HttpResponse::Ok().json(get_photo_by_id(&photo_store, &path.into_inner())?))
}
