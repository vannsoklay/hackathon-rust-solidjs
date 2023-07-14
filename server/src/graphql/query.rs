use async_graphql::{Context, FieldResult};
use futures_util::StreamExt;

use crate::{middleware::context::{Claim, AppContext}, models::story::{Story, self}};

pub struct QueryRoot;

#[async_graphql::Object]
impl QueryRoot {
    pub async fn hello(&self, ctx: &Context<'_>) -> FieldResult<String> {
        Ok("hello".to_string())
    }

    pub async fn get_stories(&self, ctx: &Context<'_>) -> FieldResult<Vec<Story>> {
        let db = ctx.data_opt::<AppContext>().clone().unwrap().db.to_owned();
        let story_model = db.collection::<Story>("stories").clone();

        let mut stories = story_model.find(None, None).await?;
        let mut data: Vec<Story> = vec![];
        while let Some(stories) = stories.next().await {
            match stories {
                Ok(story) => {
                    data.push(story);
                },
                Err(e) => return Err(e.into())
            }
        }
        Ok(data)
    }
}
