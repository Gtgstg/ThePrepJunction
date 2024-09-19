import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const CourseForm = () => {
  const [formData, setFormData] = useState({
    thumbnail: '',
    url: '',
    imgAlt: '',
    title: '',
    description:''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://15.207.223.154:3600/api/courses', formData);
      console.log(response.data);
      // Optionally, reset the form after successful submission
      setFormData({
        thumbnail: '',
        url: '',
        imgAlt: '',
        title: '',
        description:''
      });
    } catch (error) {
      console.error('Error adding video:', error);
    }
  };

  return (
    <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Add New Video
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Thumbnail URL"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Video URL"
            name="url"
            value={formData.url}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Alt Text for Image"
            name="imgAlt"
            value={formData.imgAlt}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button variant="contained" color="primary" type="submit" style={{ marginTop: '20px' }}>
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default CourseForm;
