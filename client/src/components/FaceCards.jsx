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


export default function FaceCards({img, data, onClick}) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const handleClick = (face, matchResults, index) => {
    onClick(face, matchResults);
    setSelectedIndex(index)
  }

  return (
    <div className={classes.root}>
      <List>
        {data.map((face, index) => (
          <React.Fragment>
          <FaceCard 
            index={index}
            face={face}
            img={img}
            selected={index === selectedIndex}
            onClick={handleClick}
          />
          {(index < data.length-1) && <Divider key={`divider-${index}`} variant="fullWidth" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </div>
  )
}
