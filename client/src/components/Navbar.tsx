import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useContext(AuthContext)!;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Niche Blog
          </Link>
        </Typography>
        {user ? (
          <>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
            <Button color="inherit">
              <Link to="/profile" style={{ color: 'inherit', textDecoration: 'none' }}>
                Profile
              </Link>
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit">
              <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
                Login
              </Link>
            </Button>
            <Button color="inherit">
              <Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>
                Register
              </Link>
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
