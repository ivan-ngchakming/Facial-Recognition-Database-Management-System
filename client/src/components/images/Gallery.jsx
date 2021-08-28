import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Image from './Image';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Gallery({images}) {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          {images && images.map((image, index) => (
            <Grid key={index} item>
              <Image 
                image={image}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}
