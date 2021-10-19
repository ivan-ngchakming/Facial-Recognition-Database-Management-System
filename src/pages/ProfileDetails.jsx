import { Paper, Grid, Card, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { graphqlQuery } from '../graphql';
import {
  PROFILE as PROFILE_GQL_Q,
  IMAGES as IMAGES_GQL_Q,
} from '../graphql/query';
import CroppedImage from '../components/images/CroppedImage';
import Gallery from '../components/images/Gallery';
import { withRouter } from 'react-router-dom';

const styles = (theme) => ({
  paper: {},
  card: {
    display: 'flex',
    padding: theme.spacing(0, 4),
  },
  details: {
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  croppedImg: {
    margin: theme.spacing(2),
  },
});

class ProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      loading: true,
      images: [],
    };
  }

  componentDidMount() {
    const search = this.props.location.search;
    const profileId = new URLSearchParams(search).get('id');
    if (profileId) {
      this.fetchProfile(profileId);
      this.fetchImages(profileId);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      const search = this.props.location.search;
      const profileId = new URLSearchParams(search).get('id');
      if (profileId) {
        this.fetchProfile(profileId);
        this.fetchImages(profileId);
      }
    }
  }

  fetchProfile = (profileId) => {
    graphqlQuery(PROFILE_GQL_Q, { profileId: profileId })
      .then((res) => {
        this.setState({ profile: res.profile });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  queryImages = (profileId) => {
    graphqlQuery(IMAGES_GQL_Q, {
      page: this.state.currentPage,
      profileId: profileId,
    })
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

  fetchImages = (profileId) => {
    this.setState({ loading: true }, () => {
      this.queryImages(profileId);
    });
  };

  render() {
    const { classes } = this.props;
    const { profile, images } = this.state;

    return (
      <React.Fragment>
        {profile ? (
          // <Container maxWidth='lg'>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Card className={classes.card}>
                  {profile.thumbnail.photo && (
                    <CroppedImage
                      imgWidth={250}
                      classes={classes}
                      img={`/api/image/${profile.thumbnail.photo.id}`}
                      faceLocation={[
                        ...profile.thumbnail.location,
                        profile.thumbnail.photo.width,
                        profile.thumbnail.photo.height,
                      ]}
                    />
                  )}

                  <div className={classes.details}>
                    <Typography variant="h2">{profile.name}</Typography>
                  </div>
                </Card>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Gallery
                images={images}
                onChange={() => {
                  this.fetchImages(profile.id);
                }}
              />
            </Grid>
          </Grid>
        ) : (
          // </Container>
          'No profile selected'
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(
  withStyles(styles, { withTheme: true })(ProfileDetails)
);
