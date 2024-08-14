
import {CardHeader, CardActions,CardContent, CardMedia, Card, Avatar, Typography, IconButton} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';

import EditPost from './EditPost';

import { useState } from 'react';


const Post = () => {
  const [isEditMode,setIsEditMode] = useState(false);

  const onEditClick = () => {
    setIsEditMode(!isEditMode);
  }

  const onSaveClick = () => {
    console.log("OK");
    setIsEditMode(!isEditMode)
  }

  return (
    (isEditMode? <EditPost onSaveClick={onSaveClick}/>
    :
    <Card sx={{ width: '30rem', backgroundColor:'#fff', padding:'1rem' }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" />
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia/>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={onEditClick}>
            <EditIcon />
          </IconButton>
      </CardActions>
      
    </Card>
));
}

export default Post;