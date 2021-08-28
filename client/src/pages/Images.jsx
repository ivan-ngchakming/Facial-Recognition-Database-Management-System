import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import Gallery from "../components/Gallery";
import { graphqlQuery } from "../graphql";
import { withRouter } from "react-router-dom";

const styles = (theme) => ({

});


class Images extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images,
    }
  }

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps, prevState) {}

  selectImage = (imageId) => {
    this.props.history.push({
      pathname:"/facial-recognition",
      state: {
        imageId: imageId,
      }
    });
  }

  fetchImages = () => {
    graphqlQuery(`query photos {
      photos {
        id
      }
    }`, {}).then(res => {
      this.setState({
        images: res.photos.map(photo => (
            {
              id: photo.id,
              source: `/api/image/${photo.id}`
            }
          ))
      })
    }).catch(error => {
      console.error(error);
    })
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

