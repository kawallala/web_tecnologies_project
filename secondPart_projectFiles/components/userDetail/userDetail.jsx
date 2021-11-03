import React from 'react';
import {
  Grid,
  Typography,
  Box,
  CircularProgress
} from '@material-ui/core';
import './userDetail.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import fetchModel from '../../lib/fetchModelData';

/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.userId,
      user : {},
      loaded:false
    }
    // console.log(window.cs142models.userModel(this.props.match.params.userId))
    // this.state = {
    //   user : window.cs142models.userModel(this.props.match.params.userId)
    // }
  }
  componentDidMount(){
    fetchModel("user/" + this.state.id).then((value)=>{
      this.setState({id: this.state.id, user:value, loaded: true})
    })
  }
  
  componentDidUpdate(prevProps){
    if(this.props.match.params.userId !== prevProps.match.params.userId){
      console.log("updating")
      fetchModel("user/" + this.props.match.params.userId).then((value)=>{
        this.setState({id: this.props.match.params.userId, user:value, loaded: true})
      })
    }
  }

  render() {
    return (
      <Box>
        {this.state.loaded?
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
      </Grid>: <CircularProgress/>}
      
      </Box>
      
    );
  }
}

export default UserDetail;
