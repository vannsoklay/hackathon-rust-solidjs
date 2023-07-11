use super::environment::environment;
use actix_web::Result;
use mongodb::{options::ClientOptions, Client};

pub async fn connect_to_mongodb() -> Result<Client, mongodb::error::Error> {
    let db_address = self::environment().await.unwrap().database.mongodb_url;
    let client_options = ClientOptions::parse(db_address.to_string()).await?;
    let client = Client::with_options(client_options);

    match client {
        Ok(client) => {
            println!("{}", "Connected to database");
            Ok(client)
        }
        Err(e) => Err(e),
    }
}
