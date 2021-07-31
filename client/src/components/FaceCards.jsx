import React, { useState, useEffect } from 'react'
import FaceCard from './FaceCard';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, List } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root:{
    height: "95%",
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
            <React.Fragment>
            <FaceCard 
              index={index}
              face={face}
              img={img}
            />
            {(index < data.length-1) && <Divider variant="fullWidth" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </div>
    // </React.Fragment>
  )
}
