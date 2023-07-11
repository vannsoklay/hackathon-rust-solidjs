use async_graphql::{Context, FieldResult};

use crate::middleware::context::Claim;

pub struct QueryRoot;

#[async_graphql::Object]
impl QueryRoot {
    pub async fn hello(&self, ctx: &Context<'_>) -> FieldResult<String> {
        let claim = ctx.data_opt::<Claim>().clone();
        println!("user {:?}", claim.unwrap());
        Ok("hello".to_string())
    }
}
