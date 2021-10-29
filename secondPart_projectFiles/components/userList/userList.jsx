import React, { useDebugValue } from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
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
    console.log(
      "window.cs142models.userListModel()",
      window.cs142models.userListModel()
    );
    this.state = {
      userList : window.cs142models.userListModel()
    }
  }

  render() {
    return (
      <div>
        {/* <Typography variant="body1">
          This is the user list, which takes up 3/12 of the window.
          You might choose to use <a href="https://material-ui.com/demos/lists/">Lists</a> and <a href="https://material-ui.com/demos/dividers">Dividers</a> to
          display your users like so:
        </Typography> */}
        <List component="nav">
          {this.state.userList.map((value, key)=>(
              <Link to={"/users/" + value._id} key = {key} underline = "none" color="inherit">
            <ListItem >
              <ListItemText primary={value.first_name} onClick = {() => console.log("hello")}/>
            </ListItem>
            <Divider />
            </Link>
          ))}
        </List>
        {/* <Typography variant="body1">
          The model comes in from window.cs142models.userListModel()
        </Typography> */}
      </div>
    );
  }
}

export default UserList;
