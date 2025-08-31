use crate::handlers::retrieve_all_photo_metadata::get_all_photo_data;
use actix_web::web;

pub fn configure_routes(cfg: &mut web::ServiceConfig) {
    cfg.route("/photos", web::get().to(get_all_photo_data));
}