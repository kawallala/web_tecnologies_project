import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Box
}
from '@material-ui/core';
import './userList.css';
import { Link } from 'react-router-dom';

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList : window.cs142models.userListModel()
    }
  }

  render() {
    return (
      <Box height = "100%" overflow="auto">
        {/* <Typography variant="body1">
          This is the user list, which takes up 3/12 of the window.
          You might choose to use <a href="https://material-ui.com/demos/lists/">Lists</a> and <a href="https://material-ui.com/demos/dividers">Dividers</a> to
          display your users like so:
        </Typography> */}
        <List component="nav">
          {this.state.userList.map((value, key)=>(
            <Link to={"/users/" + value._id} key = {key} underline = "none" color="inherit">
              <ListItem >
                <ListItemText primary={value.first_name}/>
              </ListItem>
              <Divider />
            </Link>
          ))}
        </List>
        {/* <Typography variant="body1">
          The model comes in from window.cs142models.userListModel()
        </Typography> */}
      </Box>
    );
  }
}

export default UserList;
