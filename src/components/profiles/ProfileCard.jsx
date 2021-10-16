import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { graphqlQuery } from '../../graphql';
import { PROFILE as PROFILE_GQL_Q } from '../../graphql/query';
import { roundOff } from '../../utils';
import CroppedImage from '../images/CroppedImage';
import LinearBarsProgress from '../progress/LinearBarsProgress';

const useStyles = makeStyles((theme) => ({
  faceCard: {
    alignItems: 'flex-start',
  },
  inline: {
    display: 'inline',
  },
  tagWrapper: {
    marginTop: theme.spacing(1),
  },
  tag: {
    marginRight: theme.spacing(1),
  },
}));

export default function ProfileCard({
  profileId,
  score,
  index,
  selected,
  onClick,
}) {
  const classes = useStyles();
  const [profile, setProfile] = useState({});

  const fetchProfile = (profileId) => {
    graphqlQuery(PROFILE_GQL_Q, { profileId: profileId })
      .then((res) => {
        setProfile(res.profile);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (Object.keys(profile).length === 0) {
      fetchProfile(profileId);
    }
  });

  return (
    <React.Fragment>
      <ListItem
        key={`selected-face-${index}`}
        button
        onClick={() => {
          onClick(index);
        }}
        className={classes.faceCard}
        selected={selected}
      >
        {profile && (
          <React.Fragment>
            <ListItemAvatar>
              {profile.thumbnail ? (
                <CroppedImage
                  img={`/api/image/${profile.thumbnail.photo.id}`}
                  faceLocation={[
                    ...profile.thumbnail.location,
                    profile.thumbnail.photo.width,
                    profile.thumbnail.photo.height,
                  ]}
                />
              ) : (
                <Avatar />
              )}
            </ListItemAvatar>

            <ListItemText
              style={{ marginLeft: '10%' }}
              primary={
                <Typography variant="h6" color="textPrimary">
                  {profile.name}
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {`${roundOff(score * 100, 2)}% Match`}
                  </Typography>

                  <LinearBarsProgress value={roundOff(score * 100, 2)} />
                </React.Fragment>
              }
            />
          </React.Fragment>
        )}
      </ListItem>
    </React.Fragment>
  );
}
