import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { Container, Grid } from "@material-ui/core";
import PageCard from "../components/nav/PageCard";
import { SITEMAP } from "../constants";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { classes } = this.props;

    return(
      <React.Fragment>
        <Container>
          <h1>Facial Recognition Database Management System</h1>
          <Grid container className={classes.root} spacing={2}>
            { SITEMAP.filter(page => page.category !== "Home").map(page => (
              <Grid item xs={4} sm={12} md={6} lg={4}>
                <PageCard page={page} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </React.Fragment>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Home);
