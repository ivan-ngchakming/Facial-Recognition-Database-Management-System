import React, { useState, useEffect } from 'react'
import CroppedImage from "./CroppedImage";
import { Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import LinearProgressWithLabel from './LinearProgressWithLabel';


const useStyles = makeStyles((theme) => ({
  root:{
    height: "95%",
    // marginBottom: "10%",
    overflowY: 'auto',
  },
  faceCard: {
    alignItems: "flex-start",
  },
  inline: {
    display: 'inline',
  }
}));


export default function FaceCards({img, data}) {
  const classes = useStyles();
  
  return (
    // <React.Fragment>
      
      <div className={classes.root}>
        <List>
          {data.map((face, index) => (
            <Box>
              <ListItem key={`face-${index}`} button className={classes.faceCard}>
                <ListItemAvatar>
                  <CroppedImage
                    img={img}
                    faceLocation={face}
                  />
                </ListItemAvatar>
                
                <ListItemText
                  style={{marginLeft: "10%"}}
                  primary={
                    <Typography
                      variant="h6"
                      color="textPrimary"
                    >
                      {"Anya Taylor Joy"}
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
                      {`100% Match`}
                    </Typography>
                    <LinearProgressWithLabel value={Math.random() * 100} />
                    </React.Fragment>
                  }
                />
              </ListItem>
              {(index < data.length-1) && <Divider variant="fullWidth" component="li" />}
            </Box>
          ))}
        </List>
      </div>
    // </React.Fragment>
  )
}
