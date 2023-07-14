use async_graphql::{Context, FieldResult};

use crate::{middleware::context::AppContext, models::story::Story, types::story::InputStory};

pub struct MutationRoot;

#[async_graphql::Object]
impl MutationRoot {
    pub async fn hello(&self) -> FieldResult<String> {
        Ok("hello".to_string())
    }
    
    pub async fn create_story(&self, ctx: &Context<'_>, input: InputStory) -> FieldResult<Story> {
        let db = ctx.data_opt::<AppContext>().clone().unwrap().db.to_owned();
        let collection = db.collection::<Story>("stories").clone();

        let doc = Story::to_insert(ctx, input).await;

        collection.insert_one(doc.to_owned(), None).await?;
        Ok(Story::filter_story_record(&doc.to_owned()))
    }
}
