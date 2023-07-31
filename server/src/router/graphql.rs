use actix_web::{
    web::{Data, Payload},
    HttpRequest, HttpResponse, Result,
};
use async_graphql::{http::GraphiQLSource, Schema};
use async_graphql_actix_web::{GraphQLRequest, GraphQLResponse, GraphQLSubscription};

use crate::{
    graphql::{mutation::MutationRoot, query::QueryRoot, subscription::SubscriptionRoot, self},
    middleware::{auth::AuthCheck, context::Claim},
};

type PrivateAppSchema = Schema<QueryRoot, MutationRoot, SubscriptionRoot>;
type PublicAppSchema = Schema<graphql::public::query::QueryRoot, MutationRoot, SubscriptionRoot>;

pub async fn private_index(
    schema: Data<PrivateAppSchema>,
    auth: AuthCheck,
    req: GraphQLRequest,
) -> GraphQLResponse {
    let mut request = req.into_inner();
    request = request.data(Claim {
        user_id: auth.access_token_oid.to_hex(),
    });
    schema.execute(request).await.into()
}

pub async fn public_index(
    schema: Data<PublicAppSchema>,
    req: GraphQLRequest,
) -> GraphQLResponse {
    let request = req.into_inner();
    schema.execute(request).await.into()
}

pub async fn index_graphiql() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(GraphiQLSource::build().endpoint("/").finish())
}

pub async fn index_ws(
    schema: Data<PrivateAppSchema>,
    req: HttpRequest,
    payload: Payload,
) -> Result<HttpResponse> {
    GraphQLSubscription::new(Schema::clone(&*schema)).start(&req, payload)
}
