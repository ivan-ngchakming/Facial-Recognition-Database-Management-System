import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";


const styles = (theme) => ({

});


class HelloWorld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: null
    }
  }

  componentDidMount() {
    this.hello();
  }

  componentDidUpdate(prevProps, prevState) {}

  hello = () => {
    fetch("/api/hello")
    .then(response => response.json())
    .then(data => {
      console.debug(data);
      this.setState({ msg: data })
    });
  }
  render() {
    const { classes } = this.props;
    const { msg } = this.state
    return(
      <div>
        { msg }
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(HelloWorld);

