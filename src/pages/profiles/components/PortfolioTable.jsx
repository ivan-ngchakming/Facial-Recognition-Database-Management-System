import {
  Container,
  Checkbox,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import React, { Component } from 'react';
import Image from '../../../components/images/Image';
import EnhancedTableHead from '../../../components/DataTable/EnhancedTableHead';
import SelectToolbar from '../../../components/SelectToolbar';
import { getComparator, stableSort } from '../../../utils';

class PortfolioTable extends Component {
  render() {
    const {
      classes,
      handleChangePage,
      handleChangeRowsPerPage,
      handleClick,
      handleSelectAllClick,
      handleRequestSort,
      headCells,
      isSelected,
      order,
      orderBy,
      profilesCount,
      selected,
      page,
      rows,
      rowsPerPage,
    } = this.props;

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <div className={classes.root}>
        <Container style={{ maxWidth: '90vw' }}>
          <Paper className={classes.paper}>
            <SelectToolbar numSelected={selected.length} title="Portfolios" />
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size="medium"
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                  headCells={headCells}
                  icon
                />
                <TableBody>
                  {rows.length > 0 &&
                    stableSort(rows, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.name);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            onClick={(event) =>
                              handleClick(event, row.name, row.id)
                            }
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.name}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                onClick={(event) =>
                                  handleClick(event, row.name, row.id)
                                }
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </TableCell>
                            <TableCell padding="checkbox">
                              <Grid style={{ margin: '10px' }}>
                                <Image
                                  image={
                                    row.thumbnail && row.thumbnail.photo
                                      ? {
                                          source: `/api/image/${row.thumbnail.photo.id}`,
                                        }
                                      : null
                                  }
                                  height={50}
                                />
                              </Grid>
                            </TableCell>
                            <TableCell align="left">{row.id}</TableCell>
                            <TableCell component="th" id={labelId} scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="left">{row.facesCount}</TableCell>
                          </TableRow>
                        );
                      })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 50 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30, 50, 100]}
              component="div"
              count={profilesCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
      </div>
    );
  }
}

export default PortfolioTable;
