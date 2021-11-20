import React from 'react';
import {
  Box,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  Paper,
  Typography,
  MobileStepper,
  Button,
  FormControlLabel,
  Switch,
  CircularProgress,
  Grid
} from '@mui/material';

import {
  KeyboardArrowLeft,
  KeyboardArrowRight
} from '@material-ui/icons';

import SwipeableViews from 'react-swipeable-views';

import {Link} from 'react-router-dom';

import fetchModel from '../../lib/fetchModelData';

/**
 * Define UserPhotos, a React componment of CS142 project #5 
 * The component displays the Photos of a user and the comments of each photo
 * The photos are normally shown as a list, but the component has an "advanced" mode to display each photo on it's own and allowing deep linking
 * 
 * Component could be split up in one component for the normal view, one for the advanced view and one for the comments
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id : this.props.match.params.userId,//the user how photos should be displayed
      advancedMode: this.props.match.params.hasOwnProperty('index'),//diaply in advanced mode or not
      activeStep: this.props.match.params.hasOwnProperty('index')? parseInt(this.props.match.params.index): 0,//if in advanced mode which photo is displyed
      loaded : false, // data isn't ready for displaying yet
    }
  }

  /**
   * Fetches information from the API declared in ../../lib/fetchModelData/ when the component gets displayed for the first time
   */
  componentDidMount(){
    fetchModel("photosOfUser/" + this.props.match.params.userId).then((value)=>{
      this.setState({
        photos: value,
        loaded: true
      })
    })
  }
  
  /**
   * Fetch new information every time the userId changes
   * if in advanced mode also chack for changes in the index
   */
  componentDidUpdate(prevProps){
    if(this.props.match.params.userId !== prevProps.match.params.userId|| 
      (this.props.match.params.hasOwnProperty('index')&&this.props.match.params.index !== this.state.activeStep)||
      (!this.props.match.params.hasOwnProperty('index')&&this.advancedMode)){
      fetchModel("photosOfUser/" + this.props.match.params.userId).then((value)=>{
        this.setState({
          photos: value,
          advancedMode: props.match.params.hasOwnProperty('index'),
          activeStep: props.match.params.hasOwnProperty('index')? parseInt(props.match.params.index): 0,
          loaded: true
        })
      })
    }
  }

  /**
   * Builds a component that displays the comments given as parameter
   * could be an own react component
   */
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
                            <Typography variant="body2">
                              {comment.comment}
                            </Typography>
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

  /**
   * Builds a component that displays the photos in advanced mode
   * could be an own react component
   */
  renderStepper(){
      const maxSteps = this.state.photos.length;
    
      //functions to handle next and prev button presses
      const handleNext = () => {
        this.props.history.push('/photos/'+this.state.user_id+'/'+(this.state.activeStep+1))
        this.setState({
            activeStep : this.state.activeStep +1,
        })
      };
      const handleBack = () => {
        this.props.history.push('/photos/'+this.state.user_id+'/'+(this.state.activeStep-1))
        this.setState({
          activeStep : this.state.activeStep -1,
        })
      };
      const handleStepChange = (step) => {
        this.setState({
          activeStep : step,
        })
        this.props.history.push('/photos/'+this.state.user_id+'/'+step)
      };
    
      return (
      <Box sx={{ maxWidth: 1, flexGrow: 1 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <MobileStepper sx={{ maxWidth: 400}} 
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
              {//render also the previous and next image for the swipe animation
              Math.abs(this.state.activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    maxHeight: 1,
                    display: 'block',
                    width: 1,
                    height: '70vh',
                    overflow: 'hidden',
                    objectFit: 'contain',
                  }}
                  src={`/images/${step.file_name}`}
                  alt={step.file_name}
                />
              ) : null}
            </div>
          ))}
        </SwipeableViews>
        <Typography variant="caption text">
            {this.state.photos[this.state.activeStep].date_time}
        </Typography>
        {this.buildComments(this.state.photos[this.state.activeStep].comments)}
      </Box>
    );
  }

  handleAdvancedModeChange = (event) => {
    this.setState({
      advancedMode : event.target.checked,
    })
    if(event.target.checked){
      this.props.history.push('/photos/'+this.state.user_id+'/'+this.state.activeStep)
    }else{
      this.props.history.push('/photos/'+this.state.user_id)
    }
  };

  /**
   * Builds a component that displays the photos as a list
   * could be an own react component
   */
  renderList(){
    return(
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
    );
  }

  render() {
    return (
      <Box height = "100%" overflow="auto">
        {//if data is loaded yet render loading animaton 
        this.state.loaded ?
        <Box>
          <FormControlLabel
            label="advanced mode"
            control={
              <Switch
                checked={this.state.advancedMode}
                onChange={this.handleAdvancedModeChange}
              />
            }
          />
          {//render list view or swipeable view depending on mode
          this.state.advancedMode?
          this.renderStepper():
          this.renderList()}
        </Box>
        :<CircularProgress/>}
      </Box>
    );
  }
}

export default UserPhotos;
