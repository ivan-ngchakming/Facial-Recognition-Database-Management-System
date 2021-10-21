import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress, Box, Container, Paper } from '@material-ui/core';

import { graphqlQuery } from '../graphql';
import { PHOTOS as PHOTOS_GQL_Q } from '../graphql/query';
import Gallery from '../components/images/Gallery';

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
    };
  }

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps, prevState) {}

  queryImages = () => {
    graphqlQuery(PHOTOS_GQL_Q, { page: this.state.currentPage })
      .then((res) => {
        const data = res.photos;
        this.setState({
          images: data.photos.map((photo) => ({
            id: photo.id,
            source: `/api/image/${photo.id}`,
          })),
          imgCount: data.count,
          totalPages: data.pages,
          loading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  fetchImages = () => {
    this.setState({ loading: true }, () => {
      this.queryImages();
    });
  };

  render() {
    const { classes } = this.props;
    const { images, loading } = this.state;

    if (loading)
      return (
        <Box className={classes.loadingWrapper}>
          <CircularProgress />
        </Box>
      );
    return (
      <>
        <Container style={{ maxWidth: '90vw' }}>
          <Paper style={{ width: '100%', marginBottom: '16px' }}>
            <Gallery images={images} onChange={this.queryImages} />
          </Paper>
        </Container>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Images);
