import React, { useState } from 'react';
import DataTable from './DataTable';

export default {
  component: DataTable,
  title: 'Components/DataTable',
};

const headCells = [
  { id: 'id', numeric: false, disablePadding: false, label: 'id' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  {
    id: 'facecount',
    numeric: false,
    disablePadding: false,
    label: 'Face Count',
  },
];

const data = {
  10: {
    0: [
      { name: 'Anya', id: 1 },
      { name: 'Anya', id: 2 },
      { name: 'Anya', id: 3 },
      { name: 'Anya', id: 4 },
      { name: 'Anya', id: 5 },
    ],
    1: [
      { name: 'Anya', id: 11 },
      { name: 'Anya', id: 12 },
      { name: 'Anya', id: 13 },
      { name: 'Anya', id: 14 },
      { name: 'Anya', id: 15 },
    ],
  },
};

const getData = (page, rowsPerPage) => data[rowsPerPage][page];

const Template = (args) => {
  const [data, setData] = useState([]);

  const refetch = (page, rowsPerPage) => {
    setData(getData(page, rowsPerPage));
  };

  return (
    <DataTable
      {...args}
      data={data}
      dataCount={40}
      refetch={refetch}
      headCells={headCells}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  title: 'Example Data Table',
  idKey: 'id',
};
