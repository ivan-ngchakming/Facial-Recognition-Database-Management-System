import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Checkbox, Grid, Toolbar, IconButton, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
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
      console.debug(res);
      this.props.onChange();
    })
  }

  render() {
    const { classes, images } = this.props;
    const { selected } = this.state;

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

          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              {images && images.map((image, index) => (
                <Grid key={index} item>
                  <Image
                    image={image}
                    onCheck={this.handleCheckImage}
                    redirect={selected.length === 0}
                    hover
                    selected={selected.includes(image.id)}
                    selectMode={selected.length > 0}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Gallery);
