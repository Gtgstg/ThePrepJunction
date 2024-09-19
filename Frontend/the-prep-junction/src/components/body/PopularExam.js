import React from 'react';
import { Container, Typography, Grid, Link, Button } from '@mui/material';

const ExamCard = ({ imgSrc, altText, title }) => (
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Link href="/quiz/1" underline="none" color="inherit">
      <img loading="lazy" height="40px" width="40px" alt={altText} title={altText} src={imgSrc} />
      <Typography variant="h6" component="span" title={title} align="center">{title}</Typography>
    </Link>
  </Grid>
);

const PopularExam = () => {
  return (
    <Container maxWidth="lg" style={{  padding: '20px' }}>
      <Typography variant="h2" align="center" gutterBottom>Popular Exams</Typography>
      <Typography align="center" gutterBottom>
        Get exam-ready with concepts, questions and study notes as per the latest pattern
      </Typography>
      <Grid container spacing={3}>
        <ExamCard imgSrc="//cdn.testbook.com/resources/productionimages/SSC_All_1594144442.png" altText="SSC CGL" title="SSC CGL" />
        {/* Add more ExamCard components as needed */}
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        <Button variant="contained" color="primary" href="/courses">
          Explore all exams
        </Button>
      </Grid>
    </Container>
  );
};

export default PopularExam;