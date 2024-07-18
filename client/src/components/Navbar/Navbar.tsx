import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';

import './Navbar.css'

const Navbar= () => {
  return (
    <div className='wrapper'>
      <nav>
          <div className="logo">
          <span>Blog</span>
          </div>
          <ul className="nav-links">
              <li><button>Home</button></li>
              <li><button>Services</button></li>
              <li><button >Contact Us</button></li>
              <li><button className="login-button">Login</button></li>
          </ul>
      </nav>
    </div>
  );
};

export default Navbar;
