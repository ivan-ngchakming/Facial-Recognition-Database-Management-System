from ariadne import make_executable_schema, snake_case_fallback_resolvers

from .app.types import type_def as app_type_def
from .app.query import query as app_query
from .app.mutation import mutation as app_mutation


type_defs = [app_type_def]
queries = [app_query]
mutations = [app_mutation]

schema = make_executable_schema(
    type_defs, queries, mutations, snake_case_fallback_resolvers
)
