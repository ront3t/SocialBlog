import React, { useContext } from 'react';
import { Container, Typography, Avatar, List, ListItem, ListItemText } from '@mui/material';
import AuthContext from '../Context/AuthContext';

const UserProfile = () => {
  const { user } = useContext(AuthContext)!;

  return (
    <Container>
      <Avatar src={user?.profilePictureUrl} alt={user?.username} />
      <Typography variant="h4">{user?.username}</Typography>
      <Typography variant="subtitle1">{user?.bio}</Typography>
      <List>
        {user?.expertise?.map((expert: string, index: number) => (
          <ListItem key={index}>
            <ListItemText primary={expert} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default UserProfile;
