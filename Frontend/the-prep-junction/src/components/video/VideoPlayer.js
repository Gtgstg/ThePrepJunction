import React from 'react';
import { Container } from '@material-ui/core';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <Container>
      <video controls width="100%" height="auto">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Container>
  );
};

export default VideoPlayer;