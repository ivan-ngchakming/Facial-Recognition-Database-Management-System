import React, { useEffect } from "react";

export default function CroppedImage({img, faceLocation, imgWidth=100, padding=100, classes=null}) {
  const [top_x, top_y, bottom_x, bottom_y, width, height] = faceLocation;

  const _width = Math.abs( top_x - bottom_x );
  const _height = Math.abs( top_y - bottom_y );

  const imgHeight = imgWidth * ( _height / height ) / (_width / width);
  const oWidth = imgWidth / ( _width + padding*2 ) * width;
  const oHeight = imgHeight / ( _height + padding*2 ) * height;
  const xOffset = oWidth * ( top_x - padding ) / width;
  const yOffset = oHeight * ( top_y - padding ) / height * 1.25;
  
  useEffect(() => {
    // console.debug(faceLocation)
  }, [faceLocation])

  return(
    <div
      className={classes ? classes.croppedImg : null}
      style={{
        width: `${imgWidth}px`,
        height: `${imgWidth}px`,
        borderRadius: "5%",
        overflow: "hidden",
      }}
    >
      <img 
        style={{
          width: `${oWidth}px`,
          marginLeft: `-${xOffset}px`,
          marginTop: `-${yOffset}px`,
        }}
        src={img} 
        alt=""
      />
    </div>
  )
}