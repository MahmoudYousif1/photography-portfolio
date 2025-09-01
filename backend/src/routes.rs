use crate::handlers::retrieve_all_photo_metadata::get_all_photo_data;
use crate::handlers::retrieve_single_photo_metadata::get_photo_by_id_handler;
use actix_web::web;

pub fn configure_routes(cfg: &mut web::ServiceConfig) {
    cfg.route("/photos", web::get().to(get_all_photo_data))
        .route("/photos/{id}", web::get().to(get_photo_by_id_handler));
}
