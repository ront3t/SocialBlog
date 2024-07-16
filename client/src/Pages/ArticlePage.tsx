import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import api from '../api/api';

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    const fetchArticle = async () => {
        try{
        const response = await api.get(`/articles/${id}`);
        setArticle(response.data);
        } catch(error){
            console.log(error)
        }
    };

    fetchArticle();
  }, [id]);

  if (!article) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h3">{article.title}</Typography>
      <Typography variant="body1">{article.content}</Typography>
    </Container>
  );
};

export default ArticlePage;
