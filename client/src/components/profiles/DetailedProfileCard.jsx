import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import CroppedImage from '../images/CroppedImage';

const useStyle = makeStyles((theme) =>({
  imgWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(10),
  },
}))

export default function DetailedProfileCard({profile}) {
  const classes = useStyle();

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
      
      <Typography variant='body2' align='right'>
        Profile ID: {profile.id}
      </Typography>

    </div>
  )
}
