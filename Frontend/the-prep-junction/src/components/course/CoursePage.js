import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/system';
import coursesData from './courses.json';

const CenteredContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
});

const useStyles = styled(theme => ({
  courseCard: {
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.05)',
      transition: 'transform 0.3s ease'
    }
  }
}));

function CoursePage() {
  const classes = useStyles();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Simulating fetching data from courses.json
    setCourses(coursesData.courses);
  }, []);

  return (
    <CenteredContainer>
      <Grid container spacing={4}>
        {courses.map(course => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Link to={`/course/${course.id}`}>
              <Card className={classes.courseCard}>
                <CardMedia component="img" src={course.logo} alt={course.name} height="200" />
                <Typography variant="h6" align="center" gutterBottom>{course.name}</Typography>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </CenteredContainer>
  );
}

export default CoursePage;
