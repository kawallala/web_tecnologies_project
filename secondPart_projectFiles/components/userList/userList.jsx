import React from 'react';
import {
  List,
  ListItem,
  Box,
  CircularProgress,
  Card,
  CardActionArea,
  CardContent
}
  from '@material-ui/core';
import './userList.css';
import { Route } from 'react-router-dom';
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
  componentDidMount() {
    fetchModel("user/list").then((value) =>
      this.setState({ userList: value, loaded: true })
    )
  }
  render() {
    return (
      <Route render={({ history }) => (
        <Box height="100%" overflow="auto">
          {this.state.loaded ?
            <List component="nav">
              {this.state.userList.map((value, key) => (
                <ListItem key={key}>
                  <Card style={{ width: "100%" }}>
                    <CardActionArea onClick={() => { history.push("/users/" + value._id); }}>
                      <CardContent>
                        {value.first_name}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </ListItem>
              ))}
            </List> : <CircularProgress />}
          {/* <Typography variant="body1">
          The model comes in from window.cs142models.userListModel()
        </Typography> */}
        </Box>
      )}
      />
    );
  }
}

export default UserList;
