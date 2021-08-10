import React, { useEffect } from "react";

export default function CroppedImage({img, faceLocation, imgWidth=100, padding=50}) {

  const imgHeight = imgWidth * (faceLocation[1] - faceLocation[3]) / (faceLocation[2] - faceLocation[0]);
  const oWidth = imgWidth / (faceLocation[2] - faceLocation[0] + padding*2) * faceLocation[4];
  const oHeight = imgHeight / (faceLocation[1] - faceLocation[3] + padding*2) * faceLocation[5];
  const xOffset = oWidth * (faceLocation[3] - padding) / faceLocation[4];
  const yOffset = oHeight * (faceLocation[0] - padding) / faceLocation[5];

  useEffect(() => {
    // console.debug(faceLocation)
  }, [faceLocation])

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