pub mod handler_jwt;
pub mod handler_response;
use crate::config::environment::environment;
use argon2::{self, Config};

pub type Response<T> = std::result::Result<T, handler_response::Error>;

// lazy_static::lazy_static! {
//     pub static ref SECRET_KEY_PASSWORD: String = environment().await.unwrap().secret_key_password;
// }

const SALT: &'static [u8] = b"supersecuresalt";

// WARNING THIS IS ONLY FOR DEMO PLEASE DO MORE RESEARCH FOR PRODUCTION USE
pub async fn hash_password(password: &str) -> Result<String, handler_response::Error> {
    let secret_key_password = environment().await.unwrap().secret_key_password;
    let config = Config {
        secret: secret_key_password.as_bytes(),
        ..Default::default()
    };
    argon2::hash_encoded(password.as_bytes(), &SALT, &config).map_err(|err| {
        dbg!(err);
        handler_response::Error::InternalServerError(format!("Please try later"))
    })
}

pub async fn verify(hash: &str, password: &str) -> Result<bool, handler_response::Error> {
    let secret_key_password = environment().await.unwrap().secret_key_password;
    argon2::verify_encoded_ext(
        hash,
        password.as_bytes(),
        secret_key_password.as_bytes(),
        &[],
    )
    .map_err(|err| {
        dbg!(err);
        handler_response::Error::Unauthorized(format!("error"))
    })
}
