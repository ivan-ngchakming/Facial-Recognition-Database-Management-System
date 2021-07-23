import React, {Component} from "react";
import { withStyles } from "@material-ui/core/styles";
import ResizeObserver from 'react-resize-observer';


const styles = (theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  box: {
    position: "absolute,",
  },
  image: {
    alignSelf: 'center',
    maxWidth: "100%",
    borderRadius: "1%",
  },
  rect: {
    border: `1px solid ${theme.palette.warning.light}`,
    position: 'absolute', 
    zIndex: 99,
  },
});


class ImageAnnotator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgWidth: 0,
      imgHeight: 0,
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  handleImageLoaded = (rect) => {
    this.setState({
      imgWidth: rect.width,
      imgHeight: rect.height,
    })
  }

  drawReac = (top, right, bottom, left, width, height, index=0) => {
    const _width = ( right - left ) / width * this.state.imgWidth;
    const _height = ( bottom - top ) / height * this.state.imgHeight;
    const _top = top * this.state.imgHeight / height;
    const _left = left * this.state.imgWidth / width;

    return (
      <div
        key={`rect-${index}`}
        className={this.props.classes.rect}
        style={{
          width: _width,
          height: _height,
          top: _top,
          left: _left,
        }}
      />
    )
  }

  render() {
    const { classes, src, faceLocations } = this.props;
    return(
      <React.Fragment>
        <div className={classes.container}>
          <ResizeObserver
            onResize={(rect) => this.handleImageLoaded(rect)}
          />
          <img
            src={src} 
            className={[classes.image, classes.box].join(' ')} 
          />
          {faceLocations.map((data, index) => (
            this.drawReac(...data, index)
          ))}
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles, { withTheme: true })(ImageAnnotator);

