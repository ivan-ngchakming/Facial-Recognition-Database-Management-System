import { withStyles } from '@material-ui/core/styles';
import {
  Container,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import React, { Component } from 'react';
import EnhancedTableHead from '../components/tables/EnhancedTableHead';
import EnhancedTableToolbar from '../components/tables/EnhancedTableToolbar';
import LinearProgressWithLabel from '../components/progress/LinearProgressWithLabel';
import { graphqlQuery } from '../graphql';
import { getComparator, stableSort } from '../utils';

const headCells = [
  { id: 'id', numeric: false, disablePadding: false, label: 'id' },
  { id: 'folder', numeric: false, disablePadding: false, label: 'Folder Path' },
  {
    id: 'imgcount',
    numeric: false,
    disablePadding: false,
    label: 'Files Count',
  },
  { id: 'progress', numeric: true, disablePadding: false, label: 'Progress' },
];

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  absolute: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
});

class BatchRecTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'id',
      selected: [],
      page: 0,
      rowsPerPage: 10,
      taskCount: 0,
      rows: [],
      selectMode: false,
    };
  }

  componentDidMount() {
    this.setState({
      rows: [
        { id: 1, folder: 'C://Images', imgcount: 100, progress: 22 },
        { id: 2, folder: 'C://Images', imgcount: 100, progress: -1 },
      ],
    });
  }

  componentDidUpdate(prevProps, prevState) {}

  handleRequestSort = (event, property) => {
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';
    this.setState({
      order: isAsc ? 'desc' : 'asc',
      orderBy: property,
    });
  };

  handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = this.state.rows.map((n) => n.name);
      this.setState({ selected: newSelecteds });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, name, id) => {
    if (this.state.selectMode || event.target.type) {
      const selectedIndex = this.state.selected.indexOf(name);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(this.state.selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(this.state.selected.slice(1));
      } else if (selectedIndex === this.state.selected.length - 1) {
        newSelected = newSelected.concat(this.state.selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          this.state.selected.slice(0, selectedIndex),
          this.state.selected.slice(selectedIndex + 1)
        );
      }

      this.setState({
        selected: newSelected,
        selectMode: newSelected.length > 0,
      });
    } else {
      // double click
      if (event.detail === 2) {
        // this.props.history.push(`/profile?id=${id}`)
      }
    }
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  isSelected = (name) => this.state.selected.indexOf(name) !== -1;

  render() {
    const { classes } = this.props;
    const { order, orderBy, selected, page, rowsPerPage } = this.state;

    const emptyRows =
      this.state.rowsPerPage -
      Math.min(
        this.state.rowsPerPage,
        this.state.rows.length - this.state.page * this.state.rowsPerPage
      );

    return (
      <div className={classes.root}>
        <Container style={{ maxWidth: '90vw' }}>
          <Paper className={classes.paper}>
            <EnhancedTableToolbar numSelected={selected.length} title="Tasks" />
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
                  onSelectAllClick={this.handleSelectAllClick}
                  onRequestSort={this.handleRequestSort}
                  rowCount={this.state.rows.length}
                  headCells={headCells}
                  endPadding
                />
                <TableBody>
                  {this.state.rows.length > 0 &&
                    stableSort(this.state.rows, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const isItemSelected = this.isSelected(row.name);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            onClick={(event) =>
                              this.handleClick(event, row.name, row.id)
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
                                  this.handleClick(event, row.name, row.id)
                                }
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </TableCell>
                            <TableCell align="left">{row.id}</TableCell>
                            <TableCell component="th" id={labelId} scope="row">
                              {row.folder}
                            </TableCell>
                            <TableCell align="left">{row.imgcount}</TableCell>
                            <TableCell component="th" id={labelId} scope="row">
                              <LinearProgressWithLabel value={row.progress} />
                            </TableCell>
                            <TableCell align="right" />
                          </TableRow>
                        );
                      })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30, 50, 100]}
              component="div"
              count={this.state.taskCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={this.handleChangePage}
              onRowsPerPageChange={this.handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BatchRecTasks);
