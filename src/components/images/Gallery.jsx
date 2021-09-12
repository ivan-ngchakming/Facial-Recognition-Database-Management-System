import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Button, Checkbox, Grid, Toolbar, IconButton, Typography, Snackbar } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import Image from './Image';
import { DELETE_PHOTOS as DELETE_PHOTOS_GQL_M } from '../../graphql/mutation';
import { graphqlQuery } from "../../graphql";

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
  }
});


class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      openDeleteSnackbar: false,
      deleteMsg: null,
      imgHash: Date.now(),
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  handleCheckImage = (_id) => {
    var newSelected = this.state.selected.slice();
    if (newSelected.includes(_id)) {
      newSelected.pop(_id)
      this.setState({selected: newSelected})
    } else {
      newSelected.push(_id)
      this.setState({selected: newSelected})
    }
  };

  handleCheckAll = () => {
    if (this.state.selected.length !== this.props.images.length) {
      this.setState({selected: this.props.images.map(image => image.id)})
    } else {
      this.setState({selected: []})
    }
  }

  handleDelete = () => {
    console.debug("Deleting selected images: ", this.state.selected);
    graphqlQuery(DELETE_PHOTOS_GQL_M, {ids: this.state.selected}).then(res => {
      const deletedImgs = res.deletePhoto;
      this.setState({
        selected: [],
        openDeleteSnackbar: true,
        deleteMsg: `${deletedImgs.length} images deleted`,
        imgHash: Date.now(),
      })
      this.props.onChange();
    })
  }

  handleCloseDeleteSnackbar = () => {
    this.setState({openDeleteSnackbar: false})
  }

  render() {
    const { classes, images } = this.props;
    const { selected, openDeleteSnackbar, deleteMsg, imgHash } = this.state;

    return(
      <React.Fragment>
        <Grid container className={classes.root} spacing={2}>

          {/* Tool Bar */}
          <Grid item xs={12}>
            {selected.length === 0 ? (
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
                  {selected.length} Image{selected.length > 1 ? 's' : null } selected
                </Typography>
                <IconButton
                  onClick={this.handleDelete}
                  color="inherit"
                >
                  <DeleteIcon />
                </IconButton>
              </Toolbar>
            ) }
          </Grid>

          <Grid container xs={12} justifyContent="center" spacing={2}>
            {/* <Grid container justifyContent="flex-start" spacing={2}> */}
              {images && (
                images.map((image, index) => (
                  <Grid key={index} item>
                    <Image
                      image={image}
                      imgHash={imgHash}
                      height={300}
                      onCheck={this.handleCheckImage}
                      redirect={selected.length === 0}
                      hover
                      selected={selected.includes(image.id)}
                      selectMode={selected.length > 0}
                    />
                  </Grid>))
              )}

              {images && images.length === 0 && (
                "No Images"
              )
              }
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
              <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleCloseDeleteSnackbar}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </React.Fragment>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Gallery);
