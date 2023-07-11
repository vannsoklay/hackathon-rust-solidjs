use crate::{
    middleware::{auth::AuthCheck, context::AppContext},
    models::user::User,
    types::user::{SignIn, SignUp},
    utils::{handler_jwt, handler_response::Error, hash_password, verify},
};
use actix_web::{
    cookie::{time::Duration as ActixWebDuration, Cookie},
    web, HttpRequest, HttpResponse, Responder,
};
use mongodb::bson::{doc, oid::ObjectId};
use redis::Commands;

pub async fn register_user_handler(
    body: web::Json<SignUp>,
    data: web::Data<AppContext>,
) -> Result<HttpResponse, Error> {
    let collection = data.as_ref().db.collection::<User>("users").to_owned();

    // let exists = colection.find(doc! {"email": body.email.to_owned()}, None).await.expect("Invalid Email!");

    // if exists {
    // return Ok(HttpResponse::Conflict().json(
    //     serde_json::json!({"status": "fail","message": "User with that email already exists"}),
    // ));
    // }
    let body: SignUp = body.into_inner();
    let password = hash_password(&body.password.to_owned()).await?;
    let user = User::to_sign_up(body, password).await;
    let cursor = collection.insert_one(user, None).await;
    match cursor {
        Ok(_) => Ok(HttpResponse::Accepted().json(serde_json::json!({
            "status": "success",
            "message": "Login successfully!"
        }))),
        Err(_) => Ok(HttpResponse::BadRequest().json(serde_json::json!({
            "status": "fail",
            "message": "Invalid Email and Password"
        }))),
    }
}

pub async fn login_user_handler(
    body: web::Json<SignIn>,
    data: web::Data<AppContext>,
) -> Result<HttpResponse, Error> {
    let collection = data.as_ref().db.collection::<User>("users").to_owned();
    let body = body.into_inner();
    let user = match collection.find_one(doc! {"email": body.email}, None).await {
        Ok(user) => user.unwrap(),
        Err(_) => {
            return Ok(HttpResponse::BadRequest().json(
                serde_json::json!({"status": "fail", "message": "Invalid email or password"}),
            ))
        }
    };
    let is_valid = verify(&user.password, &body.password).await?;

    if !is_valid {
        return Ok(HttpResponse::BadRequest()
            .json(serde_json::json!({"status": "fail", "message": "Invalid email or password"})));
    }

    let access_token_details = match handler_jwt::generate_jwt_token(
        ObjectId::parse_str(&user.id).unwrap(),
        data.env.jwt.access_token_maxage,
        data.env.jwt.access_token_private_key.to_owned(),
    ) {
        Ok(token_details) => token_details,
        Err(e) => {
            return Ok(HttpResponse::BadGateway()
                .json(serde_json::json!({"status": "fail", "message": format_args!("{}", e)})));
        }
    };

    let refresh_token_details = match handler_jwt::generate_jwt_token(
        ObjectId::parse_str(&user.id).unwrap(),
        data.env.jwt.refresh_token_maxage,
        data.env.jwt.refresh_token_private_key.to_owned(),
    ) {
        Ok(token_details) => token_details,
        Err(e) => {
            return Ok(HttpResponse::BadGateway()
                .json(serde_json::json!({"status": "fail", "message": format_args!("{}", e)})));
        }
    };

    let mut redis_client = match data.redis_client.get_connection() {
        Ok(redis_client) => redis_client,
        Err(e) => {
            return Ok(HttpResponse::InternalServerError()
                .json(serde_json::json!({"status": "fail", "message": format_args!("{}", e)})));
        }
    };

    let access_result: redis::RedisResult<()> = redis_client.set_ex(
        access_token_details.oid.to_string(),
        user.id.to_string(),
        (data.env.jwt.access_token_maxage * 60) as usize,
    );

    if let Err(e) = access_result {
        return Ok(HttpResponse::UnprocessableEntity()
            .json(serde_json::json!({"status": "error", "message": format_args!("{}", e)})));
    }

    let refresh_result: redis::RedisResult<()> = redis_client.set_ex(
        refresh_token_details.oid.to_string(),
        user.id.to_string(),
        (data.env.jwt.refresh_token_maxage * 60) as usize,
    );

    if let Err(e) = refresh_result {
        return Ok(HttpResponse::UnprocessableEntity()
            .json(serde_json::json!({"status": "error", "message": format_args!("{}", e)})));
    }

    let access_cookie = Cookie::build("access_token", access_token_details.token.clone().unwrap())
        .path("/")
        .max_age(ActixWebDuration::new(
            data.env.jwt.access_token_maxage * 60,
            0,
        ))
        .http_only(true)
        .finish();
    let refresh_cookie = Cookie::build("refresh_token", refresh_token_details.token.unwrap())
        .path("/")
        .max_age(ActixWebDuration::new(
            data.env.jwt.refresh_token_maxage * 60,
            0,
        ))
        .http_only(true)
        .finish();
    let logged_in_cookie = Cookie::build("logged_in", "true")
        .path("/")
        .max_age(ActixWebDuration::new(
            data.env.jwt.access_token_maxage * 60,
            0,
        ))
        .http_only(false)
        .finish();

    Ok(HttpResponse::Ok()
        .cookie(access_cookie)
        .cookie(refresh_cookie)
        .cookie(logged_in_cookie)
        .json(serde_json::json!({"status": "success", "access_token": access_token_details.token.unwrap()})))
}

pub async fn refresh_access_token_handler(
    req: HttpRequest,
    data: web::Data<AppContext>,
) -> impl Responder {
    let collection = data.as_ref().db.collection::<User>("users").to_owned();
    let message = "could not refresh access token";

    let refresh_token = match req.cookie("refresh_token") {
        Some(c) => c.value().to_string(),
        None => {
            return HttpResponse::Forbidden()
                .json(serde_json::json!({"status": "fail", "message": message}));
        }
    };

    let refresh_token_details = match handler_jwt::verify_jwt_token(
        data.env.jwt.refresh_token_public_key.to_owned(),
        &refresh_token,
    ) {
        Ok(token_details) => token_details,
        Err(e) => {
            return HttpResponse::Forbidden()
                .json(serde_json::json!({"status": "fail", "message": format_args!("{:?}", e)}));
        }
    };

    let result = data.redis_client.get_connection();
    let mut redis_client = match result {
        Ok(redis_client) => redis_client,
        Err(e) => {
            return HttpResponse::Forbidden().json(
                serde_json::json!({"status": "fail", "message": format!("Could not connect to Redis: {}", e)}),
            );
        }
    };
    let redis_result: redis::RedisResult<String> =
        redis_client.get(refresh_token_details.oid.to_string());

    let user_id = match redis_result {
        Ok(value) => value,
        Err(_) => {
            return HttpResponse::Forbidden()
                .json(serde_json::json!({"status": "fail", "message": message}));
        }
    };

    let user_id = ObjectId::parse_str(&user_id).unwrap();

    let user = match collection.find_one(doc!{"_id": user_id}, None).await {
        Ok(user) => user.unwrap(),
        Err(_) => return HttpResponse::Forbidden()
        .json(serde_json::json!({"status": "fail", "message": "the user belonging to this token no logger exists"}))
    };

    let access_token_details = match handler_jwt::generate_jwt_token(
        ObjectId::parse_str(&user.id).unwrap(),
        data.env.jwt.access_token_maxage,
        data.env.jwt.access_token_private_key.to_owned(),
    ) {
        Ok(token_details) => token_details,
        Err(e) => {
            return HttpResponse::BadGateway()
                .json(serde_json::json!({"status": "fail", "message": format_args!("{:?}", e)}));
        }
    };

    let redis_result: redis::RedisResult<()> = redis_client.set_ex(
        access_token_details.oid.to_string(),
        user.id.to_string(),
        (data.env.jwt.access_token_maxage * 60) as usize,
    );

    if redis_result.is_err() {
        return HttpResponse::UnprocessableEntity().json(
            serde_json::json!({"status": "error", "message": format_args!("{:?}", redis_result.unwrap_err())}),
        );
    }

    let access_cookie = Cookie::build("access_token", access_token_details.token.clone().unwrap())
        .path("/")
        .max_age(ActixWebDuration::new(
            data.env.jwt.access_token_maxage * 60,
            0,
        ))
        .http_only(true)
        .finish();

    let logged_in_cookie = Cookie::build("logged_in", "true")
        .path("/")
        .max_age(ActixWebDuration::new(
            data.env.jwt.access_token_maxage * 60,
            0,
        ))
        .http_only(false)
        .finish();

    HttpResponse::Ok()
        .cookie(access_cookie)
        .cookie(logged_in_cookie)
        .json(serde_json::json!({"status": "success", "access_token": access_token_details.token.unwrap()}))
}

pub async fn logout_handler(
    req: HttpRequest,
    auth_guard: AuthCheck,
    data: web::Data<AppContext>,
) -> impl Responder {
    let message = "Token is invalid or session has expired";

    let refresh_token = match req.cookie("refresh_token") {
        Some(c) => c.value().to_string(),
        None => {
            return HttpResponse::Forbidden()
                .json(serde_json::json!({"status": "fail", "message": message}));
        }
    };

    let refresh_token_details = match handler_jwt::verify_jwt_token(
        data.env.jwt.refresh_token_public_key.to_owned(),
        &refresh_token,
    ) {
        Ok(token_details) => token_details,
        Err(e) => {
            return HttpResponse::Forbidden()
                .json(serde_json::json!({"status": "fail", "message": format_args!("{:?}", e)}));
        }
    };

    let mut redis_client = data.redis_client.get_connection().unwrap();
    let redis_result: redis::RedisResult<usize> = redis_client.del(&[
        refresh_token_details.oid.to_string(),
        auth_guard.access_token_oid.to_string(),
    ]);

    if redis_result.is_err() {
        return HttpResponse::UnprocessableEntity().json(
            serde_json::json!({"status": "error", "message": format_args!("{:?}", redis_result.unwrap_err())}),
        );
    }

    let access_cookie = Cookie::build("access_token", "")
        .path("/")
        .max_age(ActixWebDuration::new(-1, 0))
        .http_only(true)
        .finish();
    let refresh_cookie = Cookie::build("refresh_token", "")
        .path("/")
        .max_age(ActixWebDuration::new(-1, 0))
        .http_only(true)
        .finish();
    let logged_in_cookie = Cookie::build("logged_in", "")
        .path("/")
        .max_age(ActixWebDuration::new(-1, 0))
        .http_only(true)
        .finish();

    HttpResponse::Ok()
        .cookie(access_cookie)
        .cookie(refresh_cookie)
        .cookie(logged_in_cookie)
        .json(serde_json::json!({"status": "success"}))
}

pub async fn get_me_handler(auth_guard: AuthCheck) -> impl Responder {
    let json_response = serde_json::json!({
        "status":  "success",
        "data": serde_json::json!({
            "user": User::filter_user_record(&auth_guard.user)
        })
    });

    HttpResponse::Ok().json(json_response)
}
