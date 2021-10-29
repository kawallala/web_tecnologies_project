import React from 'react';
/*import {
  Box
  /*ImageList,
  ImageListItem,
  ImageListItemBar,
  ImageListItemBar,
  ListItem
} from '@mui/material';*/
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import './userPhotos.css';


/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos : window.cs142models.photoOfUserModel(this.props.match.params.userId)
    }
    console.log(this.state.photos)
  }

  render() {
    return (
      /*<Typography variant="body1">
      This should be the UserPhotos view of the PhotoShare app. Since
      it is invoked from React Router the params from the route will be
      in property match. So this should show details of user:
      {this.props.match.params.userId}. You can fetch the model for the user from
      window.cs142models.photoOfUserModel(userId):
        <Typography variant="caption">
          {JSON.stringify(window.cs142models.photoOfUserModel(this.props.match.params.userId))}
        </Typography>
      </Typography>*/

      /*_id  (string) - The ID of the photo
      *   date_time (date) - he date and time the picture was taken in ISO format.
      *   file_name (string) - The file name in the image directory of the picture.
      *   user_id (string) - The user id of the picture's owner.
      *   comments: {array of objects} - An array of comment objects containing the properties:
      *        _id  (string) - The ID of the comment.
      *        date_time (date) - The date the comment was made in ISO format.
      *        comment (string) - The text of the comment.
      *        user: {object} The user info (see userMode for format) who made the comment
      *        photo_id: (string) - The ID of the photo the comment belongs to.*/

      <Box sx={{ width: 500, height: 450, overflowY: 'scroll' }}>
        <ImageList variant="masonry" cols={3} gap={8}>
          {this.state.photos.map((item) => (
            <ImageListItem key={item._id}>
              <ImageListItemBar position="above" title={item.date_time} />
              <img
                src={`${item.File_name}`}
                alt={item.File_name}
                loading="lazy"
              />
              <h2>Comments</h2>
              <List>
              {/*{item.comments.map((comment) => (
                <ListItem disablePadding>
                  Comment
                </ListItem>
              ))}*/}
              </List>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    );
  }
}

export default UserPhotos;
