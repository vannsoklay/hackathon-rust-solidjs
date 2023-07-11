use actix_web::{error::ResponseError, HttpResponse};
use derive_more::*;

#[derive(Debug, Display)]
pub enum Error {
    #[display(fmt = "Internal Server Error {}", _0)]
    InternalServerError(String),

    #[display(fmt = "BadRequest: {}", _0)]
    BadRequest(String),

    #[display(fmt = "Unauthorized, {}", _0)]
    Unauthorized(String),

    #[display(fmt = "NotFound, {}", _0)]
    NotFound(String),
}

impl ResponseError for Error {
    fn error_response(&self) -> HttpResponse {
        match self {
            Error::NotFound(ref message) => HttpResponse::NotFound()
                .json(serde_json::json!({"status": 404, "message": "fail", "error": message})),
            Error::InternalServerError(ref message) => HttpResponse::InternalServerError()
                .json(serde_json::json!({"status": 500, "message": "fail", "error": message})),
            Error::BadRequest(ref message) => HttpResponse::BadRequest()
                .json(serde_json::json!({"status": 400, "message": "fail", "error": message})),
            Error::Unauthorized(ref message) => HttpResponse::Unauthorized()
                .json(serde_json::json!({"status": 401, "message": "fail", "error": message})),
        }
    }
}