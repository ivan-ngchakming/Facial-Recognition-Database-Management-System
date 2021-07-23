import { AppBar, Avatar, Drawer, IconButton, List, ListItem, ListItemText, SvgIcon, Toolbar } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from "react";





export default function CroppedImage({img, faceLocation, imgWidth=100, padding=50}) {

  const imgHeight = imgWidth * (faceLocation[1] - faceLocation[3]) / (faceLocation[2] - faceLocation[0]);
  const oWidth = imgWidth / (faceLocation[2] - faceLocation[0] + padding*2) * faceLocation[4];
  const oHeight = imgHeight / (faceLocation[1] - faceLocation[3] + padding*2) * faceLocation[5];
  const xOffset = oWidth * (faceLocation[3] - padding) / faceLocation[4];
  const yOffset = oHeight * (faceLocation[0] - padding) / faceLocation[5];

  return(
    <React.Fragment>
      <div
        style={{
          width: `${imgWidth}px`,
          height: `${imgHeight}px`,
          borderRadius: "5%",
          overflow: "hidden",
        }}
      >
        <img 
          style={{
            width: `${oWidth}px`,
            height: `${oHeight}px`,
            marginLeft: `-${xOffset}px`,
            marginTop: `-${yOffset}px`,
          }}
          src={img} 
        />
      </div>
    </React.Fragment>
  )
}