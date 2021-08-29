import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { graphqlQuery } from "../graphql";
import { PROFILE as PROFILE_GQL_Q } from "../graphql/query";

const styles = (theme) => ({

});


class ProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
    }
  }

  componentDidMount() {
    const search = this.props.location.search;
    const profileId = new URLSearchParams(search).get('id');
    if (profileId) {
      this.fetchProfile(profileId);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      const search = this.props.location.search;
      const profileId = new URLSearchParams(search).get('id');
      if (profileId) {
        this.fetchProfile(profileId);
      }
    }
  }

  fetchProfile = (profileId) => {
    graphqlQuery(PROFILE_GQL_Q, {profileId: profileId}).then(res => {
      this.setState({profile: res.profile})
    }).catch(err => {
      console.error(err);
    })
  }

  render() {
    const { classes } = this.props;
    const { profile } = this.state;

    return(
      <React.Fragment>
        { profile ? profile.id : "No profile selected" }
      </React.Fragment>
    )
  }
}

export default withStyles(styles, { withTheme: true })(ProfileDetails);

