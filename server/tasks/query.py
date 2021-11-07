import logging

from ariadne import QueryType, convert_kwargs_to_snake_case

from server.taskmanager import manager


logger = logging.getLogger(__name__)

query = QueryType()


@query.field("task")
@convert_kwargs_to_snake_case
def resolve_task(_, info, task_collection_id):
    return manager.status(task_collection_id)


@query.field("tasks")
@convert_kwargs_to_snake_case
def resolve_tasks(_, info):
    return manager.status()
