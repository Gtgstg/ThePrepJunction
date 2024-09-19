import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const QuizForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    questions: [
      {
        question: '',
        options: ['', '', ''], // Assuming 3 options per question
        correctAnswerIndex: 0, // Index of correct option in the options array
        timeLimit: ''
      }
    ]
  });

  const handleChange = (e, questionIndex) => {
    const { name, value } = e.target;
    if (name.includes('options')) {
      const options = [...formData.questions[questionIndex].options];
      options[parseInt(name[name.length - 1])] = value;
      setFormData({
        ...formData,
        questions: formData.questions.map((question, index) =>
          index === questionIndex ? { ...question, options } : question
        )
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          question: '',
          options: ['', '', ''],
          correctAnswerIndex: 0,
          timeLimit: ''
        }
      ]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://15.207.223.154:3600/api/quizs', formData); // Assuming the API endpoint for quizzes is '/api/quizzes'
      console.log(response.data);
      // Optionally, reset the form after successful submission
      setFormData({
        title: '',
        description: '',
        questions: [
          {
            question: '',
            options: ['', '', ''],
            correctAnswerIndex: 0,
            timeLimit: ''
          }
        ]
      });
    } catch (error) {
      console.error('Error adding quiz:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Create New Quiz
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Quiz Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Quiz Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          required
        />
        {formData.questions.map((question, index) => (
          <div key={index}>
            <Typography variant="h6" gutterBottom>
              Question {index + 1}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={2}
              label={`Question ${index + 1}`}
              name={`question-${index}`}
              value={question.question}
              onChange={(e) => handleChange(e, index)}
              margin="normal"
              required
            />
            {question.options.map((option, optionIndex) => (
              <TextField
                key={optionIndex}
                fullWidth
                label={`Option ${optionIndex + 1}`}
                name={`options-${index}-${optionIndex}`}
                value={option}
                onChange={(e) => handleChange(e, index)}
                margin="normal"
                required
              />
            ))}
            <TextField
              fullWidth
              label="Correct Answer Index"
              type="number"
              name={`correctAnswerIndex-${index}`}
              value={question.correctAnswerIndex}
              onChange={(e) => handleChange(e, index)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Time Limit (in seconds)"
              type="number"
              name={`timeLimit-${index}`}
              value={question.timeLimit}
              onChange={(e) => handleChange(e, index)}
              margin="normal"
              required
            />
          </div>
        ))}
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={handleAddQuestion}
          style={{ marginTop: '20px' }}
        >
          Add Question
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: '20px', marginLeft: '10px' }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default QuizForm;
