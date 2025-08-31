use std::env;

#[derive(Debug, Clone)]
pub struct Config {
    pub host: String,
    pub port: String,
    pub workers: usize,
    pub photo_data_path: String,
}

impl Config {
    pub fn from_env() -> Self {
        Self {
            host: env::var("HOST").unwrap_or_else(|_| "127.0.0.1".to_string()),
            port: env::var("PORT").unwrap_or_else(|_| "8080".to_string()),
            workers: env::var("WORKERS")
                .unwrap_or_else(|_| "4".to_string())
                .parse::<usize>()
                .unwrap_or(4),
            photo_data_path: env::var("PHOTO_DATA_PATH")
                .unwrap_or_else(|_| "resources/photoinfo.json".to_string()),
        }
    }

    pub fn bind_address(&self) -> String {
        format!("{}:{}", self.host, self.port)
    }
}
