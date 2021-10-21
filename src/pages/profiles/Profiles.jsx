import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import ProfileTable from '../profiles/components/ProfileTable';
import ProfileGallery from '../profiles/components/ProfileGallery';
import { graphqlQuery } from '../../graphql';
import { PROFILES as PROFILES_GQL_Q } from '../../graphql/query';

export function createData(name, id, facecount) {
  return { name, id, facecount };
}

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

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  btn: {
    margin: theme.spacing(0, 0, 2, 0),
    minWidth: '100px',
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

class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewName: 'Gallery View',
      order: 'asc',
      orderBy: 'id',
      selected: [],
      showGallery: false,
      page: 0,
      rowsPerPage: 10,
      profilesCount: 0,
      rows: [],
      selectMode: false,
    };
  }

  componentDidMount() {
    this.fetchProfiles();
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
        this.props.history.push(`/profile?id=${id}`);
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

  handleClickView = () => {
    this.setState({ showGallery: !this.state.showGallery });
    if (this.state.showGallery) {
      this.setState({ viewName: 'Gallery View' });
    } else {
      this.setState({ viewName: 'Table View' });
    }
  };

  isSelected = (name) => this.state.selected.indexOf(name) !== -1;

  fetchProfiles = () => {
    graphqlQuery(PROFILES_GQL_Q, {
      page: this.state.page,
      perPage: this.state.rowsPerPage,
    })
      .then((res) => {
        const data = res.profiles;
        this.setState({
          rows: data.profiles,
          profilesCount: data.count,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  render() {
    const { classes } = this.props;
    const {
      order,
      orderBy,
      selected,
      page,
      rowsPerPage,
      showGallery,
      viewName,
    } = this.state;

    return (
      <React.Fragment>
        <Button
          onClick={this.handleClickView}
          variant="contained"
          className={classes.btn}
        >
          {viewName}
        </Button>
        {!showGallery ? (
          <ProfileTable
            classes={classes}
            handleChangePage={this.handleChangePage}
            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
            handleClick={this.handleClick}
            handleSelectAllClick={this.handleSelectAllClick}
            handleRequestSort={this.handleRequestSort}
            headCells={headCells}
            isSelected={this.isSelected}
            order={order}
            orderBy={orderBy}
            profilesCount={this.state.profilesCount}
            selected={selected}
            page={page}
            rows={this.state.rows}
            rowsPerPage={rowsPerPage}
          />
        ) : (
          <ProfileGallery
            classes={classes}
            height={300}
            onCheck={this.handleCheckImage}
            redirect={selected.length === 0}
            hover
            rows={this.state.rows}
            selectMode={selected.length > 0}
          />
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Profiles);
