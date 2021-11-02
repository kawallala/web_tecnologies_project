import React from 'react';
import {
  Box,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  Paper,
  Typography,
} from '@mui/material';

import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';

import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';


/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id : this.props.match.params.userId,
      photos : window.cs142models.photoOfUserModel(this.props.match.params.userId),
      activeStep: 0,
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.match.params.userId !== state.user_id) {
      return {
        user_id : props.match.params.userId,
        photos : window.cs142models.photoOfUserModel(props.match.params.userId),
        activeStep: 0,
      };
    }
    return null;
  }

  buildComments(comments){
    let commentView = <Box/>
    if(comments !== undefined){
      commentView = 
        <Box>
          <Typography variant="h6"> Comments</Typography>
          <List>
          {comments.map((comment) => {
            return (
                  <ListItem disablePadding key={comment._id}>
                    <Paper>
                      <Grid container>
                        <Grid item xs={6}>
                          <Link to={"/users/" + comment.user._id} style={{ textDecoration: 'none' }}>
                            <Typography  variant="body1" m = {0.5}>
                              {comment.user.first_name+" "+comment.user.last_name}
                            </Typography>
                          </Link>
                        </Grid>
                        <Grid item xs={6} align="right" m = {0.5}>
                          <Typography variant="caption text" align="right">
                            {comment.date_time}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Box p = {0.5} pl ={1.5}>
                            <Paper>
                              <Typography variant="body2">
                                {comment.comment}
                              </Typography>
                            </Paper>
                          </Box>
                        </Grid>
                      </Grid>
                    </Paper>
                  </ListItem>
                )})}
          </List>
        </Box>
    }
    return commentView
  }

  buildStepper(){
      
      /*const [activeStep, setActiveStep] = [0,0]*/
      const maxSteps = this.state.photos.length;
    
      const handleNext = () => {
        this.setState({
            activeStep : this.state.activeStep +1,
        })
      };
    
      const handleBack = () => {
        this.setState({
          activeStep : this.state.activeStep -1,
        })
      };
    
      const handleStepChange = (step) => {
        this.setState({
          activeStep : step,
        })
      };
    
      return (
      <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={this.state.activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={this.state.activeStep === maxSteps - 1}
            >
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={this.state.activeStep === 0}>
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
        <SwipeableViews
          axis={'x'}
          index={this.state.activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {this.state.photos.map((step, index) => (
            <div key={step._id}>
              {Math.abs(this.state.activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 255,
                    display: 'block',
                    maxWidth: 400,
                    overflow: 'hidden',
                    width: '100%',
                  }}
                  src={`/images/${step.file_name}`}
                  alt={step.file_name}
                />
              ) : null}
            </div>
          ))}
        </SwipeableViews>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'background.default',
          }}
        >
          <Typography>{this.state.photos[this.state.activeStep].date_time}</Typography>
        </Paper>
      </Box>
    );
  }

  render() {
    return (
      <div>
       {this.buildStepper()}
      {/*
      <Box height = "100%" overflow="auto">
        <ImageList variant="masonry" cols={3} gap={8}>
          {this.state.photos.map((item) => {return (
            <ImageListItem key={item._id} style={{backgroundColor: "#F0F0F0"}} >
              <img
                src={`/images/${item.file_name}`}
                alt={item.file_name}
                loading="lazy"
              />
              <Box display="flex" flexDirection="column">
                <Typography variant="caption text" align="right" align-content="flex-end">
                  {item.date_time}
                </Typography>
              </Box>
              {this.buildComments(item.comments)}
            </ImageListItem>
          )})}
        </ImageList>
      </Box>
          );*/}
          </div>
    );
  }
}

export default UserPhotos;
