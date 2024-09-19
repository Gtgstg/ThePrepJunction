// Course.js
import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import VideoPlayer from '../video/VideoPlayer';

function Course({ course }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h2" gutterBottom>{course.name}</Typography>
        <Grid container spacing={2}>
          {course.videos.map(video => (
            <Grid item xs={12} key={video.id}>
              <VideoPlayer video={video} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Course;
