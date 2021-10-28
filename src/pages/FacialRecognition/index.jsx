import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, CircularProgress, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { graphqlQuery } from '../../graphql';
import { PHOTO as PHOTO_GQL_M } from '../../graphql/mutation';
import { PHOTO as PHOTO_GQL_Q } from '../../graphql/query';
import { getFaceLocations } from '../../utils';

import ImageAnalytics from './components/ImageAnalytics';
import UploadImage from './components/UploadImage';

const styles = (theme) => ({
  root: {
    marginTop: '10vh',
  },
  div: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(2, 0, 2, 0),
  },
});

class FacialRecognition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faces: null,
      imgId: null,
      isUploading: false,
    };
  }

  componentDidMount = () => {
    const search = this.props.location.search;
    const imgId = new URLSearchParams(search).get('id');
    if (imgId) {
      this.setState({ imgId: imgId }, () => {
        this.fetchImage(this.state.imgId);
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      const search = this.props.location.search;
      const imgId = new URLSearchParams(search).get('id');
      if (imgId) {
        this.setState({ imgId: imgId }, () => {
          this.fetchImage(this.state.imgId);
        });
      }
    }
  }

  updateFaceState = (faces, faceLocations) => {
    // TODO: Rewrite this into a utils function
    const newFaces = faces.map((face, index) => ({
      face: face,
      location: faceLocations[index],
    }));
    this.setState({ faces: newFaces });
  };

  uploadImage = (file) => {
    console.debug('Uploading image file');
    this.setState({ isUploading: true }, () => {
      const reader = new FileReader();
      reader.onload = () => {
        console.debug('Reader loaded', reader);
        var binaryStr = reader.result;
        binaryStr = binaryStr.replace('data:image/jpeg;base64,', '');

        graphqlQuery(PHOTO_GQL_M, { rbytes: binaryStr }).then((res) => {
          console.debug(res);
          const faceLocations = getFaceLocations(res.photo);
          this.updateFaceState(res.photo.faces, faceLocations);
          this.setState({
            isUploading: false,
            imgId: res.photo.id,
          });
        });
      };
      reader.readAsDataURL(file);
    });
  };

  fetchImage = (id) => {
    this.setState({ isUploading: true, imgId: id }, () => {
      graphqlQuery(PHOTO_GQL_Q, { photoId: id }).then((res) => {
        const faceLocations = getFaceLocations(res.photo);
        this.updateFaceState(res.photo.faces, faceLocations);
        this.setState({
          isUploading: false,
        });
      });
    });
  };

  imageAnalyticsCallBack = () => {
    this.setState({
      faces: null,
      imgId: null,
      isUploading: false,
    });
  };

  render() {
    const { classes } = this.props;
    const { imgId, isUploading, faces } = this.state;

    return (
      <React.Fragment>
        <Container>
          <h1>Facial Recognition</h1>

          {!faces && !isUploading && (
            <UploadImage uploadImage={this.uploadImage} />
          )}

          {isUploading && (
            <div className={classes.root}>
              <div className={classes.div}>
                <Typography variant="body1">Creating new Image</Typography>
              </div>
              <div className={classes.div}>
                <CircularProgress />
              </div>
            </div>
          )}

          {faces && !isUploading && (
            <ImageAnalytics
              image={`/api/image/${imgId}`}
              data={faces}
              callback={this.imageAnalyticsCallBack}
            />
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(
  withStyles(styles, { withTheme: true })(FacialRecognition)
);
