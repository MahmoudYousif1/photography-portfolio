mod handlers;
mod models;
mod routes;
mod utils;

use actix_cors::Cors;
use actix_web::{App, HttpServer, middleware::Compress, web};
use log::{error, info};
use std::io::{Error, ErrorKind};
use utils::{config, loader::load_photo_data_once};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Initialize environment and logging
    dotenv::dotenv().ok();
    env_logger::init();

    // Load configuration
    let config = config::Config::from_env();

    // Load photo data once at startup
    let photo_store = load_photo_data_once(&config.photo_data_path).map_err(|e| {
        error!("Failed to load photo data: {}", e);
        Error::new(ErrorKind::Other, e.to_string())
    })?;

    info!(
        "Loaded {} photos from {}",
        photo_store.photos.len(),
        config.photo_data_path
    );

    let bind_address = config.bind_address();
    let workers = config.workers;
    info!("Starting server on http://{}", bind_address);

    // Start HTTP server
    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(config.clone()))
            .app_data(web::Data::new(photo_store.clone()))
            .wrap(Compress::default())
            .wrap(Cors::permissive())
            .service(web::scope("/api/v1").configure(routes::configure_routes))
    })
    .workers(workers)
    .bind(bind_address)?
    .run()
    .await
}
