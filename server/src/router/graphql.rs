use actix_web::{
    web::{Data, Payload},
    HttpRequest, HttpResponse, Result,
};
use async_graphql::{http::GraphiQLSource, Schema};
use async_graphql_actix_web::{GraphQLRequest, GraphQLResponse, GraphQLSubscription};

use crate::{graphql::{mutation::MutationRoot, query::QueryRoot, subscription::SubscriptionRoot}, middleware::{auth::AuthCheck, context::Claim}};

type AppSchema = Schema<QueryRoot, MutationRoot, SubscriptionRoot>;

pub async fn index(schema: Data<AppSchema>, auth: AuthCheck, req: GraphQLRequest) -> GraphQLResponse {
    let mut request = req.into_inner();
    request = request.data(Claim {
        user_id: auth.access_token_oid.to_hex()
    });
    schema.execute(request).await.into()
}

pub async fn index_graphiql() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(GraphiQLSource::build().endpoint("/").finish())
}

pub async fn index_ws(
    schema: Data<AppSchema>,
    req: HttpRequest,
    payload: Payload,
) -> Result<HttpResponse> {
    GraphQLSubscription::new(Schema::clone(&*schema)).start(&req, payload)
}