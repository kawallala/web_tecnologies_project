import React from 'react';
import {
  AppBar, Toolbar, Typography, Box
} from '@material-ui/core';
import './TopBar.css';
import fetchModel from '../../lib/fetchModelData';

/**
 * Define TopBar, a React component of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id : "", // name of user
      group_name : "group 47", // name of group
      url : window.location.href, // current url
      home_page : false, // flag if user is on homepage
      photos : false, // flag if user is on on photopage
      v : "" // v value displaying on homepage
    }
    window.addEventListener("popstate", () => { // run this code everytime url changes
      this.marlenas_func();
    })
  }

  marlenas_func(){
    if(window.location.href.split("/").length > 5){ //check if it is on homepage or not
      fetchModel("user/" + window.location.href.split("/")[5]).then((value) => { // get user name from url
        this.setState({ url : window.location.href, user_id : value.first_name, home_page : false, photos : false});
        if(window.location.href.split("/")[4] == "photos"){ // if user clicked on photos chage the flag
          this.setState({ photos : true});
        }
      })
    }else{ // if it is on homepage update v value
      fetchModel("test/info").then((value) => { // get v value
        this.setState({ url : window.location.href, home_page : true, v : value.__v, photos : false, user_id : ""})
      })
    }
  }

  componentDidMount(){
    this.marlenas_func()
  }

  componentDidUpdate(){
  }



  render() {

    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar display="flex">
          <Typography style={{width:"80%"}} align="left" variant="h5" color="inherit">
              {this.state.photos ? "Photos of " + this.state.user_id : this.state.user_id}
          </Typography>
          <Typography style={{width:"20%"}} align="right" variant="h5" color="inherit">
              {this.state.group_name}
              {this.state.home_page? " v: " + this.state.v : ""}
          </Typography>
          </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
