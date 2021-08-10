import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { Button, Container, Typography } from "@material-ui/core";
import Gallery from "../components/Gallery";


const styles = (theme) => ({

});


class Images extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images,
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  selectImage = (imageId) => {
    this.props.history.push({
      pathname:"/facial-recognition",
      state: {
        imageId: imageId,
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { images } = this.state;

    return(
      <React.Fragment>
        <Gallery images={images} />
      </React.Fragment>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Images);

