extern crate base64;

mod config;
mod graphql;
mod middleware;
mod models;
mod router;
mod types;
mod utils;

use crate::graphql::{mutation::MutationRoot, query::QueryRoot, subscription::SubscriptionRoot};
use crate::middleware::context::AppContext;
use crate::router::graphql::{index, index_graphiql, index_ws};
use actix_cors::Cors;
use actix_web::{
    guard, http,
    web::{resource, Data, get},
    App, HttpServer,
};
use async_graphql::Schema;
use config::{db::connect_to_mongodb, environment::environment};
use redis::Client;

use router::security::{register_user_handler, login_user_handler, logout_handler, refresh_access_token_handler, get_me_handler};

async fn not_found() -> impl actix_web::Responder {
    "404"
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {

    std::env::set_var("RUST_LOG", "actix_web=debug");
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
    if self::environment().await.is_err(){
        println!("🔥 Error connecting to environment");
        std::process::exit(1);
    }
    let ip = environment().await.unwrap().ip;

    let redis_client = match Client::open(environment().await.unwrap().database.redis_url) {
        Ok(client) => {
            println!("✅ Connection to the redis is successful!");
            client
        }
        Err(e) => {
            println!("🔥 Error connecting to Redis: {}", e);
            std::process::exit(1);
        }
    };
    
    let context = AppContext {
        db: connect_to_mongodb()
            .await
            .unwrap()
            .to_owned()
            .database("test_db"),
        env: environment().await.unwrap(),
        redis_client: redis_client.to_owned()
    };

    let schema = Schema::build(QueryRoot, MutationRoot, SubscriptionRoot)
        .data(context.to_owned())
        .finish();

    println!("Server is running at http://localhost:8000");
    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin("http://localhost:3000")
            .allow_any_origin()
            .allowed_methods(vec!["GET", "POST", "PATCH", "DELETE"])
            .allowed_headers(vec![
                http::header::AUTHORIZATION,
                http::header::ACCEPT,
                http::header::ACCESS_CONTROL_ALLOW_ORIGIN,
            ])
            .allowed_header(http::header::CONTENT_TYPE)
            .supports_credentials()
            .max_age(3600);
        App::new()
            .app_data(Data::new(schema.clone()))
            .app_data(Data::new(context.to_owned()))
            .wrap(cors)
            .service(resource("/api/signup").guard(guard::Post()).to(register_user_handler))
            .service(resource("/api/signin").guard(guard::Post()).to(login_user_handler))
            .service(resource("/api/refresh").guard(guard::Get()).to(refresh_access_token_handler))
            .service(resource("/api/logout").guard(guard::Get()).to(logout_handler))
            .service(resource("/api/me").guard(guard::Get()).to(get_me_handler))
            .service(resource("/").guard(guard::Post()).to(index))
            .service(
                resource("/")
                    .guard(guard::Get())
                    .guard(guard::Header("upgrade", "websocket"))
                    .to(index_ws),
            )
            .service(resource("/").guard(guard::Get()).to(index_graphiql))
            .route("/*", get().to(not_found))
    })
    .workers(2)
    .bind((ip.to_string(), 8000))?
    .run()
    .await
}
