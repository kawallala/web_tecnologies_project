import React from 'react';
import {
  Grid,
  Typography
} from '@material-ui/core';
import './userDetail.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    console.log(window.cs142models.userModel(this.props.match.params.userId))
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
        <Grid item xs = {12}>
          <Link to={"/photos/" + this.state.user._id}>
            See photos
          </Link>
        </Grid>
      </Grid>
      
    );
  }
}

export default UserDetail;
