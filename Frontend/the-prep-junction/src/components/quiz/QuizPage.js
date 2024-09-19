import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Quiz from './Quiz';

const GradientCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(to bottom right, #4b6cb7, #182848)',
  color: '#fff',
  minHeight: '100vh', // Set minimum height to cover the entire viewport
}));

const QuizPage = () => {
  const location = useLocation();
  const ids = location.state;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0); // Time left for the current question
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    // Fetch quiz data when component mounts
    const fetchQuizData = async () => {
      try {
        const response = await axios.post('http://13.126.195.239:3600/api/questions/getQuestionsByIds', { ids : ids });
        setQuizData(response.data);
        setTimeLeft(response.data[0].timeLimit);
      } catch (error) {
        console.error('Error fetching quiz data', error);
      }
    };

    fetchQuizData();
  }, [ids]);

  useEffect(() => {
    if (currentQuestion < quizData.length) {
      setTimeLeft(quizData[currentQuestion].timeLimit);
    }
  }, [currentQuestion, quizData]);

  // Start the timer for each question
  useEffect(() => {
    let timer;
    if (timeLeft >= 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime === 0) {
            clearInterval(timer);
            handleTimeOut();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerSubmit = (questionIndex, optionIndex) => {
    const question = quizData[currentQuestion];
    const option = question.options[optionIndex];
    setUserAnswers({ ...userAnswers, [questionIndex]: optionIndex });

    // Calculate score
    if (option.isCorrect) {
      setScore(score + 1);
    }
    // Move to next question
    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    if (currentQuestion < quizData.length - 1) {
      setTimeLeft(quizData[currentQuestion + 1].timeLimit);
    } else {
      handleQuizEnd(); // If it's the last question, end the quiz
    }
  };

  const handleTimeOut = () => {
    // If time runs out, move to the next question
    moveToNextQuestion();
  };

  const handleQuizEnd = () => {
    // Handle end of quiz (e.g., display results)
    console.log('Quiz ended');
    setQuizFinished(true);
  };

  return (
    <GradientCard>
      <CardContent style={styles.content}>
        <Typography variant="h5" component="div" gutterBottom>
          Quiz Series
        </Typography>
        {quizFinished ? (
          <div>
            <Typography variant="h6" gutterBottom>
              Quiz Completed!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Your score: {score}
            </Typography>
          </div>
        ) : (
          currentQuestion < quizData.length && (
            <div>
              <Typography variant="h6" component="div" gutterBottom>
                Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
              </Typography>
              <Quiz
                question={quizData[currentQuestion]}
                onAnswerSubmit={handleAnswerSubmit}
              />
            </div>
          )
        )}
      </CardContent>
    </GradientCard>
  );
};

const styles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh', // Center content vertically
  },
};

export default QuizPage;
