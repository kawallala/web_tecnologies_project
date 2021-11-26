import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter, Route, Switch
} from 'react-router-dom';
import {
  Grid, Typography, Paper, Box
} from '@material-ui/core';
import './styles/main.css';

// import necessary components
import TopBar from './components/topBar/TopBar';
import UserDetail from './components/userDetail/UserDetail';
import UserList from './components/userList/UserList';
import UserPhotos from './components/userPhotos/UserPhotos';

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location : "none"
    };
  }

  render() {
    return (
      <HashRouter>
        {/* Hide scrollbars and display then in components instead */}
        <Box overflow="hidden">
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <TopBar {...this.state}/>
            </Grid>
            <div className="cs142-main-topbar-buffer" />
            <Grid item sm={3}>
              <Paper className="cs142-main-grid-item">
                <UserList />
              </Paper>
            </Grid>
            <Grid item sm={9}>
              <Paper className="cs142-main-grid-item">
                <Switch>
                  <Route exact path="/"
                    render={() =>
                      <Box
                        display="flex" 
                        flexDirection = "column"
                        width="100%" height="100%" 
                        alignItems="center"
                        justifyContent="center"
                      >
                      <Typography variant="h3">
                        Welcome to our photo sharing app!
                      </Typography>
                      <Typography variant="subtitle1">
                        Click on the users on the side to view their profiles and photos, hope you enjoy!
                      </Typography>
                    </Box>}
                  />
                  <Route path="/users/:userId"
                    render={props =>
                      <UserDetail {...props} />
                    }
                  />
                  <Route path="/photos/:userId/:index"
                    render={props => <UserPhotos {...props} />}
                  />
                  <Route path="/photos/:userId"
                    render={props => <UserPhotos {...props} />}
                  />
                  <Route path="/users" component={UserList} />
                </Switch>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </HashRouter>
    );
  }
}


ReactDOM.render(
  <PhotoShare />,
  document.getElementById('photoshareapp'),
);
