use crate::utils::handler_response::Error;
use actix_web::dev::Payload;
use actix_web::{http, web, FromRequest, HttpRequest};
use futures::executor::block_on;
use mongodb::bson::{doc, oid::ObjectId};
use redis::Commands;
use serde::{Deserialize, Serialize};
use std::future::{ready, Ready};

use crate::models::user::User;
use crate::utils::handler_jwt;
use crate::AppContext;

#[derive(Debug, Serialize, Deserialize)]
pub struct AuthCheck {
    pub user: User,
    pub access_token_oid: ObjectId,
}

impl FromRequest for AuthCheck {
    type Error = Error;
    type Future = Ready<Result<Self, Self::Error>>;
    fn from_request(req: &HttpRequest, _: &mut Payload) -> Self::Future {
        let data = req.app_data::<web::Data<AppContext>>().unwrap();

        let access_token = req
            .cookie("access_token")
            .map(|c| c.value().to_string())
            .or_else(|| {
                req.headers()
                    .get(http::header::AUTHORIZATION)
                    .map(|h| h.to_str().unwrap().split_at(7).1.to_string())
            });

        if access_token.is_none() {
            return ready(Err(Error::Unauthorized(format!(
                "You are not logged in, please provide token"
            ))));
        }

        let access_token_details = match handler_jwt::verify_jwt_token(
            data.env.jwt.access_token_public_key.to_owned(),
            &access_token.unwrap(),
        ) {
            Ok(token_details) => token_details,
            Err(e) => {
                return ready(Err(Error::Unauthorized(format!("{:?}", e))));
            }
        };

        let access_token_oid = ObjectId::parse_str(&access_token_details.oid.to_string()).unwrap();

        let user_id_redis_result = async move {
            let mut redis_client = match data.redis_client.get_connection() {
                Ok(redis_client) => redis_client,
                Err(e) => {
                    return Err(Error::InternalServerError(format!("{:?}", e)));
                }
            };

            let redis_result = redis_client.get::<_, String>(access_token_oid.clone().to_string());

            match redis_result {
                Ok(value) => Ok(value),
                Err(_) => Err(Error::Unauthorized(format!(
                    "Token is invalid or session has expired"
                ))),
            }
        };

        let user_exists_result = async move {
            let db = data.as_ref().db.collection::<User>("users").to_owned();
            let user_id = user_id_redis_result.await?;
            let user_id_oid = ObjectId::parse_str(user_id.as_str()).unwrap();

            let query_result = db.find_one(doc! {"_id": user_id_oid}, None).await;

            match query_result {
                Ok(Some(user)) => Ok(user),
                Ok(None) => Err(Error::Unauthorized(format!(
                    "the user belonging to this token no logger exists"
                ))),
                Err(_) => Err(Error::Unauthorized(format!(
                    "Faled to check user existence"
                ))),
            }
        };

        match block_on(user_exists_result) {
            Ok(user) => ready(Ok(AuthCheck {
                access_token_oid,
                user,
            })),
            Err(error) => ready(Err(Error::InternalServerError(format!("{:?}", error)))),
        }
    }
}
