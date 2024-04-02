import React from 'react';
import { AppBar, Toolbar, Typography, Button, Link } from '@mui/material';
import { styled } from '@mui/system';

// Styled AppBar for the footer
const FooterAppBar = styled(AppBar)({
  backgroundColor: '#333',
  color: '#fff',
});

// Styled Typography for the footer text
const FooterText = styled(Typography)({
  marginRight: '20px', // Adjust spacing if needed
});

const Footer = () => {
  return (
    <FooterAppBar position="static">
      <Toolbar>
        <FooterText variant="h6">
        <img src="ThePrepJunction.png" alt="Logo" style={{ width: '150px' }} />
        </FooterText>
        <div>
          <Typography variant="body1" className="brand-text">
            The Prep Junction Pvt. Ltd.
          </Typography>
          <Typography variant="body2" className="address">
            2nd Floor, Plot No. 4, Minarch Tower, Sector-44, Gurgaon, Haryana, India, 122003
          </Typography>
          <a href="mailto:support@theprepjunction.com" className="footer-link">support@theprepjunction.com</a>
          <Typography variant="body2" className="footer-link">
            Toll Free: <a href="tel:18002030577">1800 203 0577</a>
          </Typography>
          <Typography variant="body2">
            Office Hours: 10 AM to 7 PM (all 7 days)
          </Typography>
        </div>
        <div>
          <Typography variant="h6" className="h4">Company</Typography>
          <div className="category-item">
            <Link href="/about-us" target="_self">About us</Link>
            <Link href="/careers" target="_self">Careers</Link>
            {/* Add more links */}
          </div>
        </div>
        <div>
          <Typography variant="h6" className="h4">Products</Typography>
          <div className="category-item">
            <Link href="/online-test-series" target="_self">Test Series</Link>
            <Link href="/free-live-tests-and-quizzes" target="_self">Live Tests and Quizzes</Link>
            {/* Add more links */}
          </div>
        </div>
        <div>
          <Typography variant="h6" className="h4">Our App</Typography>
          <Link href="https://link.testbook.com/iosAppStore">
            <img src="../../angular/assets/img/template-img/appstore.svg" alt="App Store" className="mb-4" />
          </Link>
          {/* Add more app links */}
        </div>
      </Toolbar>
    </FooterAppBar>
  );
};

export default Footer;