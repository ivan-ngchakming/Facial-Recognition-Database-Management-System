from ariadne import load_schema_from_path
from ariadne import make_executable_schema

from .query import query
from .mutation import mutation

# Load schema from file...
type_defs = load_schema_from_path("server/schema/type.graphql")

schema = make_executable_schema(type_defs, query, mutation)
