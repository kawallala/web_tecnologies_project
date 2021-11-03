import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Box,
  CircularProgress
}
from '@material-ui/core';
import './userList.css';
import { Link } from 'react-router-dom';
import fetchModel from '../../lib/fetchModelData';

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: {},
      loaded: false,
    }
  }
  componentDidMount(){
    fetchModel("user/list").then((value) =>
      this.setState({userList: value, loaded:true})
    )
  }
  render() {
    return (
       <Box height = "100%" overflow="auto">
         {this.state.loaded ? 
        <List component="nav">
          {this.state.userList.map((value, key)=>(
            <Link to={"/users/" + value._id} key = {key} underline = "none" color="inherit">
              <ListItem >
                <ListItemText primary={value.first_name}/>
              </ListItem>
              <Divider />
            </Link>
          ))}
        </List> : <CircularProgress/>}
        {/* <Typography variant="body1">
          The model comes in from window.cs142models.userListModel()
        </Typography> */}
      </Box> 
      
    );
  }
}

export default UserList;
