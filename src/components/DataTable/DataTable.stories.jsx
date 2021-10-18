import React, { useState } from 'react';
import DataTable from './DataTable';

export default {
  component: DataTable,
  title: 'Components/DataTable',
};

// const data = {
// 	10: {
// 		0: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
// 		1: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
// 		2: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
// 		3: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
// 	},
// 	20: {
// 		0: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
// 		1: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
// 	},
// }

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

  return <DataTable {...args} data={data} dataCount={40} refetch={refetch} />;
};

export const Primary = Template.bind({});
Primary.args = {
  title: 'Example Data Table',
  idKey: 'id',
};
