import { Button, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom';
import CroppedImage from '../images/CroppedImage';

const useStyle = makeStyles((theme) =>({
  imgWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(10),
  },
  btnWrapper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
  },
}))

export default function DetailedProfileCard({profile}) {
  const classes = useStyle();
  const history = useHistory();

  const handleViewProfile = () => {
    history.push(`/profile?id=${profile.id}`)
  }

  return (
    <div>
      <Typography variant='h6' align='center'>
        {profile.name}
      </Typography>

      { profile.thumbnail && (
        <div className={classes.imgWrapper}>
          <CroppedImage
            img={`/api/image/${profile.thumbnail.photo.id}`}
            faceLocation={
              [
                ...profile.thumbnail.location,
                profile.thumbnail.photo.width,
                profile.thumbnail.photo.height,
              ]
            }
          />
        </div>
      )}
      <div className={classes.btnWrapper}>
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
          onClick={handleViewProfile}
          // disabled={isSubmitting}
        >
          View Profile
        </Button>
      </div>

      <Typography variant='body2' align='right'>
        Profile ID: {profile.id}
      </Typography>

    </div>
  )
}
