use async_graphql::{Object, Context};
use mongodb::bson::{
    oid::ObjectId,
    serde_helpers::{deserialize_hex_string_from_object_id, serialize_hex_string_as_object_id}, DateTime,
};
use serde::{Deserialize, Serialize};

use crate::{types::story::InputStory, middleware::context::Claim};

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Story {
    #[serde(
        deserialize_with = "deserialize_hex_string_from_object_id",
        serialize_with = "serialize_hex_string_as_object_id",
        rename(deserialize = "_id", serialize = "_id")
    )]
    pub id: String,
    pub title: String,
    pub thumnail: String,
    pub content: String,
    pub tags: Vec<String>,
    pub status: bool,
    pub author_id: String,
    pub created_at: String,
    pub updated_at: String,
}

impl Story {
    pub async fn to_insert(ctx: &Context<'_>, input: InputStory) -> Story {
        Story {
            id: ObjectId::new().to_hex(),
            title: input.title,
            thumnail: input.thumnail,
            content: input.content,
            tags: input.tags,
            status: input.status,
            author_id: ctx.data_opt::<Claim>().clone().unwrap().user_id.to_string(),
            created_at: DateTime::now().to_string(),
            updated_at: DateTime::now().to_string()
        }
    }

    pub fn filter_story_record(story: &Story) -> Story {
        Story {
            id: story.id.to_string(),
            title: story.title.to_string(),
            thumnail: story.thumnail.to_string(),
            content: story.content.to_string(),
            tags: Vec::from(story.tags.to_owned()),
            status: story.status.to_owned(),
            author_id: story.author_id.to_owned(),
            created_at: story.created_at.to_string(),
            updated_at: story.updated_at.to_string(),
        }
    }
}

#[Object]
impl Story {
    async fn id(&self) -> &str {
        &self.id
    }
    async fn title(&self) -> &str {
        &self.title
    }
}
