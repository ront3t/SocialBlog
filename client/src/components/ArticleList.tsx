import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../api/api';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await api.get('/articles');
      setArticles(response.data);
    };

    fetchArticles();
  }, []);

  return (
    <List>
      {articles.map((article: any) => (
        <ListItem key={article._id} component={Link} to={`/article/${article._id}`}>
          <ListItemText primary={article.title} />
        </ListItem>
      ))}
    </List>
  );
};

export default ArticleList;
