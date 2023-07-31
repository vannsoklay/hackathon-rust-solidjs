use async_graphql::{Context, FieldResult};
use futures_util::StreamExt;

use crate::{
    middleware::context::AppContext,
    models::story::{self, Story},
};

pub struct QueryRoot;

#[async_graphql::Object]
impl QueryRoot {
    pub async fn get_stories(&self, ctx: &Context<'_>) -> FieldResult<Vec<Story>> {
        let db = ctx.data_opt::<AppContext>().clone().unwrap().db.to_owned();
        let story_model = db.collection::<Story>("stories").clone();

        let mut stories = story_model.find(None, None).await?;
        let mut data: Vec<Story> = vec![];
        while let Some(stories) = stories.next().await {
            match stories {
                Ok(story) => {
                    data.push(story);
                }
                Err(e) => return Err(e.into()),
            }
        }
        Ok(data)
    }
}
