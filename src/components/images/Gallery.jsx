import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Snackbar, Box } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Image from './Image';
import { DELETE_PHOTOS as DELETE_PHOTOS_GQL_M } from '../../graphql/mutation';
import { graphqlQuery } from '../../graphql';
import { ContextMenuProvider } from '../context/MenuContext';
import SelectToolbar from '../SelectToolbar';

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

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      openDeleteSnackbar: false,
      deleteMsg: null,
      imgHash: Date.now(),
    };
  }

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
    if (this.state.selected.length !== this.props.images.length) {
      this.setState({ selected: this.props.images.map((image) => image.id) });
    } else {
      this.setState({ selected: [] });
    }
  };

  handleDeleteSelected = () => {
    console.debug('Deleting selected images: ', this.state.selected);
    graphqlQuery(DELETE_PHOTOS_GQL_M, { ids: this.state.selected }).then(
      (res) => {
        const deletedImgs = res.deletePhoto;
        this.setState({
          selected: [],
          openDeleteSnackbar: true,
          deleteMsg: `${deletedImgs.length} images deleted`,
          imgHash: Date.now(),
        });
        this.props.onChange();
      }
    );
  };

  handleSingleDelete = (id) => {
    console.debug('Deleting selecte image: ', [id]);
    graphqlQuery(DELETE_PHOTOS_GQL_M, { ids: [id] }).then((res) => {
      const deletedImgs = res.deletePhoto;
      this.setState({
        selected: this.state.selected.filter((item) => item !== id),
        openDeleteSnackbar: true,
        deleteMsg: `${deletedImgs.length} images deleted`,
        imgHash: Date.now(),
      });
      this.props.onChange();
    });
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
    {
      name: 'delete-option',
      renderName: () => 'Delete',
      action: this.handleSingleDelete,
    },
  ];
  render() {
    const { classes, images } = this.props;
    const { selected, openDeleteSnackbar, deleteMsg, imgHash } = this.state;

    return (
      <>
        <SelectToolbar
          numSelected={selected.length}
          onDelete={this.handleDeleteSelected}
          title="Gallery"
        />
        <ContextMenuProvider options={this.contextMenuOptions}>
          {/* {selected.length === 0 ? (
          <Toolbar>
            <Typography variant="h5" className={classes.title}>
              Images
            </Typography>
          </Toolbar>
        ) : (
          <Toolbar className={classes.tools}>
            <Checkbox
              checked={selected.length > 0}
              onChange={this.handleCheckAll}
              indeterminate={selected.length !== images.length}
              color="primary"
              inputProps={{ 'aria-label': 'select image checkbox' }}
            />
            <Typography variant="body1" className={classes.title}>
              {selected.length} Image{selected.length > 1 ? 's' : null}{' '}
              selected
            </Typography>
            <IconButton
              onClick={this.handleDeleteSelected}
              color="inherit"
            >
              <DeleteIcon />
            </IconButton>
          </Toolbar>
        )} */}
          <Grid container xs={12} spacing={2} style={{ marginTop: '10px' }}>
            {images &&
              images.map((image, index) => (
                <Grid key={index} item>
                  <Image
                    image={image}
                    imgHash={imgHash}
                    height={290}
                    href={`/facial-recognition?id=${image.id}`}
                    onCheck={this.handleCheckImage}
                    redirect={selected.length === 0}
                    hover
                    selected={selected.includes(image.id)}
                    selectMode={selected.length > 0}
                  />
                </Grid>
              ))}

            {images && images.length === 0 && 'No Images'}
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
              <>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={this.handleCloseDeleteSnackbar}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </>
            }
          />
        </ContextMenuProvider>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Gallery);
