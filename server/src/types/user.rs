use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct SignUp {
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub password: String,
    pub phone_number: Option<String>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct SignIn {
    pub email: String,
    pub password: String,
}
