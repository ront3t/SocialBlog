import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import Post from '../Post/Post'
import api from '../../api/api';

import './PostList.css'


interface IPost {

}
const PostList = () => {
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await api.get('/posts');
  //     setPosts(response.data);
  //   };

  //   fetchPosts();
  // }, []);

  return (
        <div> 
          <Post />
        </div>
  );
};

export default PostList;
