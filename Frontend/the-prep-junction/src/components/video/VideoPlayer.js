// VideoPlayer.js
import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

function VideoPlayer({ video }) {
  return (
    <Card>
      <CardMedia
        component="video"
        src={video.url}
        autoPlay
        loop
        controls
        height="360"
      />
      <CardContent>
        <Typography variant="h5">{video.title}</Typography>
      </CardContent>
    </Card>
  );
}

export default VideoPlayer;
