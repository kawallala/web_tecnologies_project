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
 * 
 * The component displays a list of the registered users in the application, inside a material ui button each
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: {},
      loaded: false,
    }
  }

  /**
   * Fetches information from the API declared in ../../lib/fetchModelData/
   */
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
        </Box>
      )}
      />
    );
  }
}

export default UserList;
