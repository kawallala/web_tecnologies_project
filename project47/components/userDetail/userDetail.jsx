import React from 'react';
import {
  Grid,
  Typography,
  Box,
  CircularProgress,
  Button
} from '@material-ui/core';
import './userDetail.css';
import { Route } from 'react-router-dom'
import fetchModel from '../../lib/fetchModelData';

/**
 * Define UserDetail, a React componment of CS142 project #5
 * 
 * Shows the detail of the user in a grid component
 */

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.userId,
      user: {},
      loaded: false
    }
  }
  componentDidMount() {
    fetchModel("user/" + this.state.id).then((value) => {
      this.setState({ id: this.state.id, user: value, loaded: true })
    })
  }

  /**
   * Since the component can change depending on changes of the url, we need to use componentDidUpdate with the preious props to 
   * check for changes and react accordingly
   * @param {props} prevProps 
   */
  componentDidUpdate(prevProps) {
    console.log(this.props)
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      fetchModel("user/" + this.props.match.params.userId).then((value) => {
        this.setState({ id: this.props.match.params.userId, user: value, loaded: true })
      })
    }
  }

  render() {
    return (
      <Route render={({ history }) => (<Box>
        {this.state.loaded ?
          <Grid container spacing={2}>
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
            <Grid item xs={12}>
              <Button onClick={() => { history.push("/photos/" + this.state.user._id) }} variant="contained">
                See photos
              </Button>
            </Grid>
          </Grid> :
          <CircularProgress />}</Box>)} />


    );
  }
}

export default UserDetail;
