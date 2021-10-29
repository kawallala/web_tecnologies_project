import React from 'react';
import {
  Grid,
  Typography
} from '@material-ui/core';
import './userDetail.css';


/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user : window.cs142models.userModel(this.props.match.params.userId)
    }
  }

  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    if (props.match.params.userId !== state.user._id) {
      return {
        user: window.cs142models.userModel(props.match.params.userId)
      };
    }
    return null;
  }
  
  render() {
    return (
      <Grid container spacing ={2}>
        <Grid item xs={3}>
          <Typography variant="subtitle1">
            name:
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1">
            {this.state.user.first_name}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1">
            last name:
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1">
            {this.state.user.last_name}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">
            location:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">
            {this.state.user.location}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1">
            Description:
          </Typography>
        </Grid><Grid item xs={6}>
          <Typography variant="subtitle1">
            {this.state.user.description}
          </Typography>
        </Grid>
        {/*<Typography variant="body1">
        This should be the UserDetail view of the PhotoShare app. Since
        it is invoked from React Router the params from the route will be
        in property match. So this should show details of user:
        {this.props.match.params.userId}. You can fetch the model for the
        user from window.cs142models.userModel(userId).
    </Typography>*/}
      </Grid>
      
    );
  }
}

export default UserDetail;
