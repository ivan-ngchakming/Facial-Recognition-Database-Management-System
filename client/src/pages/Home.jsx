import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { Container } from "@material-ui/core";

const styles = (theme) => ({

});


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}


  render() {
    // const { classes } = this.props;
    return(
      <React.Fragment>
        <Container>

        </Container>
      </React.Fragment>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Home);

