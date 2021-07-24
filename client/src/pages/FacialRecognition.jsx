import { Container, Grid , Paper, Typography, Zoom } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import ImageAnnotator from "../components/ImageAnnotator";
import FaceCards from "../components/FaceCards";
import ResizeObserver from 'react-resize-observer';
// import img from '../testpic1.jpg';
import img  from '../anya.jpg';

const data = [
  [502, 1221, 965, 759, 2000, 3000],
  // [502, 1221, 965, 759, 2000, 3000],
  // [502, 1221, 965, 759, 2000, 3000],
  // [502, 1221, 965, 759, 2000, 3000],
  // [502, 1221, 965, 759, 2000, 3000],
  // [502, 1221, 965, 759, 2000, 3000],
];

const MIN_GRID_HEIGHT = 400;

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    justify: "center"
  },
  imgWrapperGrid: {
    height: '100%',
  },
  imageWrapper: {
    padding: theme.spacing(2),
  },
  result: {
    padding: theme.spacing(2),
    height: "100%",
  },
  scroll: {
    overflowY: 'scroll',
  },
});


class FacialRecognition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgGridHeight: 0,
    }
  }

  componentDidMount = () => {}

  componentDidUpdate = (prevProps, prevState) => {}

  updateImgGridHeight = (gridHeight) => {
    const height = window.innerWidth >= 960 ? (
      Math.max(MIN_GRID_HEIGHT, gridHeight)
    ) : '100%';
    this.setState({
      imgGridHeight: height,
    });
  }

  render() {
    const { classes } = this.props;
    const { imgGridHeight } = this.state;

    return(
      <React.Fragment>
        <Container >
          <h1>Facial Recognition</h1>
          <Grid container spacing={4} className={classes.root}>
            <Zoom in >
            <Grid item xs={12} md={4} className={classes.imgWrapperGrid}>
              <ResizeObserver
                onReflow={(rect) => this.updateImgGridHeight(rect.height)}
              />
              <Paper className={classes.imageWrapper}>
                <ImageAnnotator src={img} faceLocations={data}/>
              </Paper>
            </Grid>
            </Zoom>
            <Zoom in style={{transitionDelay: '10ms'}}>
            <Grid 
              item xs={12} 
              md={4} 
              style={{maxHeight: imgGridHeight}}
            >
              <Paper className={classes.result} >
                {`${data.length} face${data.length>1? 's':''} found`}
                <FaceCards 
                  img={img} 
                  data={data}
                />
              </Paper>
            </Grid>
            </Zoom>
            <Zoom in style={{transitionDelay: '20ms'}}>
            <Grid item xs={12} md={4}>
              <Paper className={classes.result}>
                <Typography>
                  Some Analytical results
                </Typography>
              </Paper>
            </Grid>
            </Zoom>
          </Grid>
        </Container>
      </React.Fragment>
    )
  }
}

export default withStyles(styles, { withTheme: true })(FacialRecognition);

