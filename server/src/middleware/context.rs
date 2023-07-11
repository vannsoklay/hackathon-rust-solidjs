use mongodb::Database;
use redis::Client;

use crate::config::environment::Config;

#[derive(Debug, Clone)]
pub struct AppContext {
    pub db: Database,
    pub env: Config,
    pub redis_client: Client,
}

#[derive(Debug, Clone)]
pub struct Claim {
    pub user_id: String
 }
 