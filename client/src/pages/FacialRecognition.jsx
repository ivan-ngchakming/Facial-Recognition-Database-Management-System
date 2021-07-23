import { Container, Grid , Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import ImageAnnotator from "../components/ImageAnnotator";
import FaceCards from "../components/FaceCards";
import clsx from "clsx";
// import img from '../testpic1.jpg';
import img  from '../anya.jpg';

const data = [
  [502, 1221, 965, 759, 2000, 3000],
  [502, 1221, 965, 759, 2000, 3000],
  // [502, 1221, 965, 759, 2000, 3000],
  // [502, 1221, 965, 759, 2000, 3000],
  // [502, 1221, 965, 759, 2000, 3000],
  // [502, 1221, 965, 759, 2000, 3000],
];

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    justify: "center"
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
      annotations: [],
      annotation: {}
    }
  }

  componentDidMount = () => {}

  render() {
    const { classes } = this.props;
    return(
      <React.Fragment>
        <Container >
          <h1>Facial Recognition</h1>
          <Grid container spacing={4} className={classes.root}>
            <Grid item xs={12} md={4}>
              <Paper className={classes.imageWrapper}>
                <ImageAnnotator src={img} faceLocations={data}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} style={{maxHeight: "700px"}}>
              <Paper className={clsx(classes.result, {[classes.scroll]: false})}>
                {`${data.length} Face Found`}
                <FaceCards 
                  img={img} 
                  data={data}
                  overflow
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={classes.result}>
                <Typography>
                  Some Analytical results
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    )
  }
}

export default withStyles(styles, { withTheme: true })(FacialRecognition);

