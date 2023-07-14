use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, async_graphql::InputObject)]
pub struct InputStory {
    pub title: String,
    pub thumnail: String,
    pub content: String,
    pub tags: Vec<String>,
    pub status: bool,
}
