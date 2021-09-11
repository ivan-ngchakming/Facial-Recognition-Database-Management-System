import React, { useState, useEffect, useRef, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Card, CardActionArea, Checkbox } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { getCornerBrightness } from '../../utils';
import clsx from 'clsx';

const BRIGHTNESS_THRESHOLD = 100;

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'relative',
  },
  img: {
    display: 'block',
    objectFit: 'cover',
    transition: '.5s ease',
  },
  optionWrapper: {
    opacity: 0,
    top: '4%',
    left: '82%',
    position: 'absolute',
    transition: '.5s ease',
  },
  option: {
    padding: '16px 32px',
  },
  checkbox: {
    boxShadow: "0 2px 2px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.16)"
  },
  checkboxWhite: {
    color: theme.palette.primary.main,
  },
}));

export default function Image({image, height=300, hover, redirect, selected, onCheck, selectMode=false}) {
  const classes = useStyles();
  const history = useHistory();
  const canvasRef = useRef(null);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [optionsOpacity, setOptionsOpacity] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(height);
  const [imgBrightness, setImageBrightness] = useState(255);

  const showOptions = () => {
    if (hover && !selectMode) {
      setOptionsOpacity(1);
      // setImageOpacity(0.3);
    }
  }

  const hideOptions = () => {
    if (hover && !selectMode) {
      setOptionsOpacity(0);
      setImageOpacity(1);
    }
  }

  const handleClick = (event) => {
    if (redirect && event.target.type !== "checkbox") {
      history.push(`/facial-recognition?id=${image.id}`);
    }
    if (selectMode) {
      onCheck(image.id);
    }
  }

  const handleChange = () => {
    onCheck(image.id);
  }

  const loadImage = useCallback(() => {
    const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      var imageObj = document.createElement('img')
      imageObj.src = image.source;

      imageObj.onload = () => {
        setCanvasHeight(Math.min(imageObj.width, imageObj.height))

        var hRatio = canvas.width / imageObj.width;
        var vRatio = canvas.height / imageObj.height;
        var ratio  = Math.max ( hRatio, vRatio );

        var centerShift_x = ( canvas.width - imageObj.width*ratio ) / 2;
        var centerShift_y = ( canvas.height - imageObj.height*ratio ) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height, centerShift_x, centerShift_y, imageObj.width*ratio, imageObj.height*ratio);
        setImageBrightness(getCornerBrightness(ctx, canvas));
      };

  }, [image]);

  // Hide checkbox when selectMode is disabled
  useEffect(() => {
    if (!selectMode) {
      setOptionsOpacity(0);
    }
  }, [selectMode])

  useEffect(() => {
    if (canvasRef && image) {
      loadImage();
    }

    if (selectMode && optionsOpacity === 0) {
      setOptionsOpacity(1);
    }
  }, [image, loadImage, selectMode, optionsOpacity])

  return (
    <React.Fragment>
      <Card
        className={classes.card}
        onMouseOver={showOptions}
        onMouseOut={hideOptions}
        style={{
          height: height,
        }}
      >
        {image ? (
          <CardActionArea onClick={handleClick}>
            <canvas
              ref={canvasRef}
              className={classes.img}
              src={image.source}
              style={{
                opacity: imageOpacity,
                height: height,
                width: height,
              }}
              height={canvasHeight}
              width={canvasHeight}
            />

            <div className={classes.optionWrapper} style={{opacity: optionsOpacity}}>
              <Checkbox
                className={clsx(classes.checkbox, {[classes.checkboxWhite]: imgBrightness < BRIGHTNESS_THRESHOLD})}
                checked={selected}
                onChange={handleChange}
                color={imgBrightness < BRIGHTNESS_THRESHOLD ? "primary" : "secondary"}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </div>

          </CardActionArea>
        ) : (
          <Avatar variant="square" style={{height: height, width: height}}/>
        )}

      </Card>
    </React.Fragment>
  )
}