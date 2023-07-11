use crate::utils::handler_response;
use actix_web::Result;
use std::fs::File;
use std::io::Read;

use serde::Deserialize;

#[derive(Deserialize, Debug, Clone)]
pub struct Config {
    pub ip: String,
    pub port: Option<u16>,
    pub database: Database,
    pub jwt: Jwt,
    pub secret_key_password: String,
}

#[derive(Deserialize, Debug, Clone)]
pub struct Database {
    pub mongodb_url: String,
    pub redis_url: String,
}

#[derive(Deserialize, Debug, Clone)]
pub struct Jwt {
    pub access_token_private_key: String,
    pub access_token_public_key: String,
    pub access_token_expired_in: String,
    pub access_token_maxage: i64,
    pub refresh_token_private_key: String,
    pub refresh_token_public_key: String,
    pub refresh_token_expired_in: String,
    pub refresh_token_maxage: i64,
}


pub async fn environment() -> Result<Config, handler_response::Error> {
    let mut file = File::open("Config.toml").unwrap();
    let mut contents = String::new();
    file.read_to_string(&mut contents).unwrap();
    let config: Config = toml::from_str(&contents).unwrap();
    Ok(config)
}
