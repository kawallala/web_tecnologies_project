import React from 'react';
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  List,
  ListItem,
  Paper,
  Typography
} from '@mui/material';
import { Grid } from '@material-ui/core';


/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos : window.cs142models.photoOfUserModel(this.props.match.params.userId)
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.match.params.userId !== state.photos[0].user_id) {
      return {
        photos : window.cs142models.photoOfUserModel(props.match.params.userId)
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
                          <Typography  variant="body1" m = {0.5}>
                            {comment.user.first_name}
                          </Typography>
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

  render() {
    return (
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
    );
  }
}

export default UserPhotos;
