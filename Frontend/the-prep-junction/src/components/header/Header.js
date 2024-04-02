import React from 'react';
import {AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const HeaderAppBar = styled(AppBar)({
  backgroundColor: '#333',
  color: '#fff',
});

const Header = () => {
    return (
      <HeaderAppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, marginRight: '20px' }}>
          <img src="ThePrepJunction.png" alt="Logo" style={{ width: '150px' }} />
          </Typography>
          <nav sx={{ display: 'flex', alignItems: 'center' }}>
            <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'center' }}>
              <li><Button component={Link} to="/" color="inherit">Exam</Button></li>
              <li><Button component={Link} to="/supercoaching" color="inherit">Supercoaching</Button></li>
              <li><Button component={Link} to="/testseries" color="inherit">Test Series</Button></li>
              <li><Button component={Link} to="/skillacademy" color="inherit">Skill Academy</Button></li>
              <li><Button component={Link} to="/more" color="inherit">More</Button></li>
            </ul>
          </nav>
        </Toolbar>
      </HeaderAppBar>
    );
  };

export default Header;