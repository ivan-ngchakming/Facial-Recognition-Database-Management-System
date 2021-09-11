from ariadne import make_executable_schema, snake_case_fallback_resolvers

from .query import query
from .mutation import mutation
from .types import type_defs

schema = make_executable_schema(
    type_defs, query, mutation, snake_case_fallback_resolvers
)
