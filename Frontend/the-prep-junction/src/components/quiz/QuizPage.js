import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';
import quizData from './QuizData'; // Import quiz data from JSON file or API
import Quiz from './Quiz';

const GradientCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(to bottom right, #4b6cb7, #182848)',
  color: '#fff',
  minHeight: '100vh', // Set minimum height to cover the entire viewport
}));

const QuizPage = () => {
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0); // Time left for the current question
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    if (currentQuestion < quizData[id].length) {
      setTimeLeft(quizData[id][currentQuestion].timeLimit);
    }
  }, [currentQuestion, id]);

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
  useEffect(() => {
  if (currentQuestion < quizData[id].length) {
    setTimeLeft(quizData[id][currentQuestion].timeLimit);
  }
}, [currentQuestion, id]);

  const handleAnswerSubmit = (questionId, answerId) => {
    setUserAnswers({ ...userAnswers, [questionId]: answerId });
    // Calculate score
    if (quizData[id][currentQuestion].correctAnswerId === answerId) {
      setScore(score + 1);
    }
    // Move to next question
    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    if (currentQuestion < quizData[id].length - 1) {
      setTimeLeft(quizData[id][currentQuestion + 1].timeLimit);
    } else {
      handleQuizEnd(); // If it's the last question, end the quiz
    }
  };

  const handleTimeOut = () => {
    // If time runs out, save the currently selected option (if any) and move to the next question
    if (!userAnswers.hasOwnProperty(quizData[id][currentQuestion].id)) {
      setUserAnswers({ ...userAnswers, [quizData[id][currentQuestion].id]: null });
    }
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
          Quiz Series {id}
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
          currentQuestion < quizData[id].length && (
            <div>
              <Typography variant="h6" component="div" gutterBottom>
                Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
              </Typography>
              <Quiz
                question={quizData[id][currentQuestion]}
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
