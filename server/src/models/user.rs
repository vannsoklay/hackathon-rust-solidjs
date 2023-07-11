use async_graphql::Object;
use mongodb::bson::{
    oid::ObjectId,
    serde_helpers::{deserialize_hex_string_from_object_id, serialize_hex_string_as_object_id},
};
use serde::{Deserialize, Serialize};

use crate::types::user::SignUp;

#[derive(Debug, Deserialize, Serialize, Clone)]
pub enum ROLE {
    WRITER,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct User {
    #[serde(
        deserialize_with = "deserialize_hex_string_from_object_id",
        serialize_with = "serialize_hex_string_as_object_id",
        rename(deserialize = "_id", serialize = "_id")
    )]
    pub id: String,
    first_name: String,
    last_name: String,
    pub password: String,
    email: String,
    phone_number: Option<String>,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct UserFilter {
    #[serde(
        deserialize_with = "deserialize_hex_string_from_object_id",
        serialize_with = "serialize_hex_string_as_object_id",
        rename(deserialize = "_id", serialize = "_id")
    )]
    pub id: String,
    first_name: String,
    last_name: String,
    email: String,
    phone_number: Option<String>,
}

impl User {
    pub async fn to_sign_up(signup: SignUp, password: String) -> User {
        User {
            id: ObjectId::new().to_hex(),
            first_name: signup.first_name.to_owned(),
            last_name: signup.last_name.to_owned(),
            password: password.to_owned(),
            email: signup.email.to_owned(),
            phone_number: match signup.phone_number {
                Some(phone_number) => Some(phone_number),
                None => None,
            },
        }
    }

    pub fn filter_user_record(user: &User) -> UserFilter {
        UserFilter {
            id: user.id.to_string(),
            first_name: user.first_name.to_owned(),
            last_name: user.last_name.to_owned(),
            email: user.email.to_owned(),
            phone_number: match user.phone_number.to_owned() {
                None => None,
                Some(user) => Some(user),
            },
        }
    }
}

#[Object]
impl User {
    async fn id(&self) -> &str {
        &self.id
    }
}
