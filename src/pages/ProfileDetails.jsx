import React, { useState, useEffect, useCallback } from 'react';
import { Paper, Grid, Card, Typography } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { graphqlQuery } from '../graphql';
import { PROFILE as PROFILE_GQL_Q } from '../graphql/query';
import useImages from '../hooks/useImages';
import CroppedImage from '../components/images/CroppedImage';
import Gallery from '../components/images/Gallery';

const ProfileDetails = () => {
  const [profile, setProfile] = useState(null);
  const [images, refetchImgs, imgCount] = useImages(0, 10);

  const location = useLocation();

  const fetchProfile = (profileId) => {
    graphqlQuery(PROFILE_GQL_Q, { profileId: profileId })
      .then((res) => {
        setProfile(res.profile);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleRefetchImgs = useCallback(
    (page, photosPerPage) => {
      const params = new URLSearchParams(location.search);
      const profileId = Number(params.get('id'));
      refetchImgs(page, photosPerPage, profileId);
    },
    [location.search, refetchImgs]
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const profileId = Number(params.get('id'));
    if (profileId) {
      fetchProfile(profileId);
    }
  }, [location]);

  return (
    <React.Fragment>
      {profile ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <Card
                style={{
                  display: 'flex',
                  padding: '0 32',
                }}
              >
                {profile.thumbnail.photo && (
                  <CroppedImage
                    imgWidth={250}
                    style={{ margin: 16 }}
                    img={`/api/image/${profile.thumbnail.photo.id}`}
                    faceLocation={[
                      ...profile.thumbnail.location,
                      profile.thumbnail.photo.width,
                      profile.thumbnail.photo.height,
                    ]}
                  />
                )}

                <div
                  style={{
                    margin: 16,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h2">{profile.name}</Typography>
                </div>
              </Card>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Gallery
              images={images}
              count={imgCount}
              onChange={handleRefetchImgs}
            />
          </Grid>
        </Grid>
      ) : (
        // </Container>
        'No profile selected'
      )}
    </React.Fragment>
  );
};

export default ProfileDetails;
