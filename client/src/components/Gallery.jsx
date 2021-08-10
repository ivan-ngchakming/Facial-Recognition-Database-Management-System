import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  img: {
    height: 300,
    width: 300,
    objectFit: 'cover',
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
              <img className={classes.img} src={image.source}/>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}
