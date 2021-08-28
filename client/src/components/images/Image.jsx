import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    height: 300,
    position: 'relative',
  },
  img: {
    display: 'block',
    height: 300,
    width: 300,
    objectFit: 'cover',
    transition: '.5s ease',
  },
  optionWrapper: {
    opacity: 0,
    top: '50%',
    left: '50%',
    position: 'absolute',
    transform: "translate(-50%, -50%)",
    textAlign: 'center',
    transition: '.5s ease',
  },
  option: {
    padding: '16px 32px',
  },
}));

export default function Image({image}) {
  const classes = useStyles();
  const history = useHistory();
  const [imageOpacity, setImageOpacity] = useState(1);
  const [optionsOpacity, setOptionsOpacity] = useState(0);

  const showOptions = () => {
    setOptionsOpacity(1);
    setImageOpacity(0.3);
  }

  const hideOptions = () => {
    setOptionsOpacity(0);
    setImageOpacity(1);
  }

  const handleClick = () => {
    history.push(`/facial-recognition?id=${image.id}`);
  }

  return (
    <React.Fragment>
      <Card 
        className={classes.card}
        onMouseOver={showOptions}
        onMouseOut={hideOptions}
      >
        <CardActionArea onClick={handleClick}>
          <CardMedia
            className={classes.img}
            image={image.source}
            style={{opacity: imageOpacity}}
          />
          <div className={classes.optionWrapper} style={{opacity: optionsOpacity}}>
            <Typography className={classes.option} variant="h6">
              See Image Recognition Result
            </Typography>
          </div>
        </CardActionArea>
      </Card>
    </React.Fragment>
  )
}
