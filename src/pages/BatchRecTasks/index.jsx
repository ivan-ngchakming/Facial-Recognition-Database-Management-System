import { Button, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import useTasks from '../../hooks/useTasks';

export default function BatchRecTasks() {
  const [tasks, fetchTasks] = useTasks();

  return (
    <>
      <Typography>Tasks</Typography>
      {tasks.map((task) => (
        <div>
          {task.task_collection_id}: {task.progress}, {task.status}
        </div>
      ))}
      <Button onClick={fetchTasks}>Refresh</Button>
    </>
  );
}
