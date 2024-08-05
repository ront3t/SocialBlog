import React, { useContext } from 'react';
import { Container, Typography, Avatar, List, ListItem, ListItemText } from '@mui/material';
import AuthContext from '../Context/AuthContext';

const UserProfile = () => {
  const { user } = useContext(AuthContext)!;

  return (
    <div>

    </div>
    );
};

export default UserProfile;
