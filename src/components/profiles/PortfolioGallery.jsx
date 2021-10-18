import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Checkbox,
  Grid,
  Toolbar,
  IconButton,
  Typography,
  Snackbar,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import Image from '../images/Image';
import { ContextMenuProvider } from '../context/MenuContext';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  tools: {
    background: theme.palette.selected.main,
    borderRadius: '5px',
  },
  title: {
    flexGrow: 1,
  },
});

class PortfolioGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      openDeleteSnackbar: false,
      deleteMsg: null,
      imgHash: Date.now(),
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  handleCheckImage = (_id) => {
    var newSelected = this.state.selected.slice();
    if (newSelected.includes(_id)) {
      newSelected.pop(_id);
      this.setState({ selected: newSelected });
    } else {
      newSelected.push(_id);
      this.setState({ selected: newSelected });
    }
  };

  handleCheckAll = () => {
    if (this.state.selected.length !== this.props.rows.length) {
      const newSelecteds = this.props.rows.map((n) => n.id);
      this.setState({ selected: newSelecteds });
      return;
    }
    this.setState({ selected: [] });
  };

  handleCloseDeleteSnackbar = () => {
    this.setState({ openDeleteSnackbar: false });
  };

  renderSelectOption = (id) => {
    if (id) {
      return this.state.selected.includes(id) ? 'Unselect' : 'Select';
    }
    return 'Select';
  };

  contextMenuOptions = [
    {
      name: 'select-option',
      renderName: (id) => this.renderSelectOption(id),
      action: this.handleCheckImage,
    },
  ];

  render() {
    const { classes, rows } = this.props;
    const { selected, openDeleteSnackbar, deleteMsg, imgHash } = this.state;

    return (
      <ContextMenuProvider options={this.contextMenuOptions}>
        <React.Fragment>
          <Grid container className={classes.root} spacing={2}>
            {/* Tool Bar */}
            <Grid item xs={12}>
              {selected.length === 0 ? (
                <Toolbar>
                  <Typography variant="h5" className={classes.title}>
                    Portfolios
                  </Typography>
                </Toolbar>
              ) : (
                <Toolbar className={classes.tools}>
                  <Checkbox
                    checked={selected.length > 0}
                    onChange={this.handleCheckAll}
                    indeterminate={selected.length !== rows.length}
                    color="primary"
                    inputProps={{ 'aria-label': 'select image checkbox' }}
                  />
                  <Typography variant="body1" className={classes.title}>
                    {selected.length} selected
                  </Typography>
                  <IconButton color="inherit">
                    <DeleteIcon />
                  </IconButton>
                </Toolbar>
              )}
            </Grid>

            <Grid container xs={12} justifyContent="center" spacing={2}>
              {/* <Grid container justifyContent="flex-start" spacing={2}> */}
              {rows &&
                rows.map((row, index) => (
                  <Grid key={index} item>
                    <Image
                      image={
                        row.thumbnail && row.thumbnail.photo
                          ? {
                              source: `/api/image/${row.thumbnail.photo.id}`,
                            }
                          : null
                      }
                      imageType={'portfolio'}
                      imgHash={imgHash}
                      height={300}
                      onCheck={this.handleCheckImage}
                      redirect={selected.length === 0}
                      hover
                      row={row}
                      selected={selected.includes(row.id)}
                      selectMode={selected.length > 0}
                    />
                  </Grid>
                ))}

              {rows && rows.length === 0 && 'No Images'}
              {/* </Grid> */}
            </Grid>
          </Grid>

          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={openDeleteSnackbar}
            autoHideDuration={6000}
            onClose={this.handleCloseDeleteSnackbar}
            message={deleteMsg}
            action={
              <React.Fragment>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={this.handleCloseDeleteSnackbar}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        </React.Fragment>
      </ContextMenuProvider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PortfolioGallery);
