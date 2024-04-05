import React from 'react';
import { Typography, TextField, Container } from '@mui/material';
import { styled } from '@mui/system';

const BannerWrapper = styled('div')({
  paddingBottom: 0,
  position: 'relative',
  minHeight: '500px', // Adjust the minimum height as needed
  paddingTop: '100px', // Add space at the top
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const SeriesHeader = styled('div')({
  marginBottom: '1rem',
  textAlign: 'center', // Center align text
});

const SearchBox = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginTop: '1rem',
  background: '#fff', // Set background to white
  padding: '8px 12px', // Add padding for better appearance
  borderRadius: '4px', // Add border radius for rounded corners
});

const BannerImg = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: -1,
});

const Banner = () => {
  return (
    <div className="banner">
      <Container maxWidth="xl">
        <BannerWrapper className="wrapper">
          <BannerImg src="Banner.png" loading="lazy" alt="Test series banner" />
          <SeriesHeader className="series__header">
            <Typography variant="h4">India's Structured Online Test series platform</Typography>
            <Typography variant="body1" sx={{ color: '#aaa' }}>Boost your exam preparation with Test Series for Banking, SSC, RRB & All other Govt. Exams</Typography>
          </SeriesHeader>
          <div className="series__content">
            <Typography variant="body2">520+ exams covered. Which exam are you preparing for?</Typography>
            <SearchBox className="search-box">
              <TextField
                type="text"
                placeholder="Search for your Exam"
                variant="outlined"
                fullWidth
              />
            </SearchBox>
          </div>
        </BannerWrapper>
      </Container>
    </div>
  );
};

export default Banner;