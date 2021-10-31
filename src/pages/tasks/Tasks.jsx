import { useState, useCallback } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';

import useTasks from '../../hooks/useTasks';
import DataTable from '../../components/DataTable/DataTable';
import SelectToolbar from '../../components/SelectToolbar';
import LinearProgressWithLabel from '../../components/progress/LinearProgressWithLabel';

const headCells = [
  { id: 'task_collection_id', label: 'id' },
  {
    id: 'progress',
    label: 'Progress',
    render: (value) => <LinearProgressWithLabel value={value * 100} />,
  },
];

export default function Tasks() {
  const [tasks, fetchTasks] = useTasks();
  const [, setSelected] = useState([]);

  const toolBarButtons = [
    <Tooltip title="Refresh">
      <IconButton aria-label="refresh" onClick={fetchTasks}>
        <RefreshIcon />
      </IconButton>
    </Tooltip>,
    <Tooltip title="Add">
      <IconButton aria-label="add" component="button" href="/tasks/create">
        <AddIcon />
      </IconButton>
    </Tooltip>,
  ];

  const toolBarSelectedButtons = [
    <Tooltip title="Delete">
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </Tooltip>,
  ];

  const ToolBar = ({ selectedItems, onCheckAll }) => {
    return (
      <SelectToolbar
        title="Tasks"
        buttons={toolBarButtons}
        selectedButtons={toolBarSelectedButtons}
        numSelected={selectedItems.length}
        checked={selectedItems.length > 0}
        indeterminate={selectedItems.length !== tasks.length}
        onCheckAll={onCheckAll}
      />
    );
  };

  const handleSelect = useCallback(
    (selected) => {
      setSelected([...selected]);
    },
    [setSelected]
  );

  return (
    <>
      <DataTable
        data={tasks}
        dataCount={tasks.length}
        refetch={fetchTasks}
        onSelect={handleSelect}
        headCells={headCells}
        ToolBar={ToolBar}
      />
    </>
  );
}
