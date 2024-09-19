import React, { useState } from 'react';
import { Button, Container, Grid, TextField } from '@material-ui/core';
import axios from 'axios';

const VideoUploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('video', file);
    try {
      await axios.post('/api/video/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Video uploaded successfully');
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            <TextField
              type="file"
              label="Select Video"
              fullWidth
              onChange={handleFileChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!file}
            >
              Upload Video
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default VideoUploadForm;