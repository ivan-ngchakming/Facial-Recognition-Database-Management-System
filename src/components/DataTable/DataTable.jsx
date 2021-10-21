import React, { useState, useEffect } from 'react';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import EnhancedTableHead from './EnhancedTableHead';
import SelectToolBar from '../SelectToolbar';

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

export default function DataTable({ title, data, refetch, dataCount, idKey }) {
  const history = useHistory();
  const [options, setOptions] = useState({
    order: 'asc',
    orderBy: 'id',
    page: 0,
    rowsPerPage: 10,
  });
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState([]);

  const { order, orderBy, page, rowsPerPage } = options;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n[idKey]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row) => {
    if (selectMode || event.target.type) {
      const selectedIndex = selected.indexOf(row[idKey]);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, row[idKey]);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelectMode(newSelected.length > 0);
      setSelected(newSelected);
    } else {
      // double click
      if (event.detail === 2) {
        history.push(`/profile?id=${row.id}`);
      }
    }
  };

  const handlePageChange = (event, newPage) => {
    setOptions({ ...options, page: newPage });
  };

  const handleRowsPerPageChange = (event) => {
    setOptions({
      ...options,
      rowsPerPage: parseInt(event.target.value, 10),
    });
  };

  useEffect(() => {
    refetch(options.page, options.rowsPerPage);
  }, [options]);

  const isSelected = (row) => selected.indexOf(row[idKey]) !== -1;

  return (
    <>
      <SelectToolBar numSelected={selected.length} title={title} />
      <TableContainer>
        <Table
          aria-labelledby="tableTitle"
          size="medium"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={() => {}}
            rowCount={data.length}
            headCells={headCells}
            icon
          />
          <TableBody>
            {data.map((row) => {
              const isItemSelected = isSelected(row);
              return (
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      onClick={(event) => handleClick(event, row)}
                      checked={isItemSelected}
                    />
                  </TableCell>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30, 50, 100]}
        component="div"
        count={dataCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </>
  );
}
