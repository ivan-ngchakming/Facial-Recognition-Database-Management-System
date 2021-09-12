import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import Gallery from "../components/images/Gallery";
import { graphqlQuery } from "../graphql";
import { PHOTOS as PHOTOS_GQL_Q } from "../graphql/query";
import { CircularProgress } from "@material-ui/core";

const styles = (theme) => ({
  loadingWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '70%',
  },
});


class Images extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images,
      currentPage: 1,
      imgCount: 0,
      totalPages: 0,
      loading: true,
    }
  }

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps, prevState) {}

  queryImages = () => {
    graphqlQuery(PHOTOS_GQL_Q, {page: this.state.currentPage}).then(res => {
      const data = res.photos;
      this.setState({
        images: data.photos.map(photo => (
          {
            id: photo.id,
            source: `/api/image/${photo.id}`
          }
        )),
        imgCount: data.count,
        totalPages: data.pages,
        loading: false,
      })
    }).catch(error => {
      console.error(error);
    })
  }

  fetchImages = () => {
    this.setState({loading: true}, () => {
      this.queryImages()
    })
  }

  render() {
    const { classes } = this.props;
    const { images, loading } = this.state;

    return(
      <React.Fragment>
        { loading ? (
          <div className={classes.loadingWrapper}>
            <CircularProgress />
          </div>
        ) : (
          <Gallery images={images} onChange={this.queryImages} />
        )}
      </React.Fragment>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Images);
