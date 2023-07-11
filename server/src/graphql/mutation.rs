use async_graphql::FieldResult;


pub struct MutationRoot;

#[async_graphql::Object]
impl MutationRoot {
    pub async fn hello(&self) -> FieldResult<String> {
        Ok("hello".to_string())
    }
}