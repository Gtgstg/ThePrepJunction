import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CourseList from './components/course/CourseList';
import CourseForm from './components/course/CourseForm';
import QuizForm from './components/quiz/QuizForm';
import SearchForm from './components/search/SearchForm';
import RecommendationList from './components/recommendation/RecommendationList';
import LoginButton from './components/button/LoginButton';
import LogoutButton from './components/button/LogoutButton';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/body/Home';
import SignIn from './components/sign-in/SignIn';
import QuizPage from './components/quiz/QuizPage';
import CoursePage from './components/course/CoursePage';
import CourseDetailPage from './components/course/CourseDetailPage';
import Stream from './components/stream/Stream';

const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
        <Header />
        <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path='/sign-in' element={<SignIn/>}/>
        <Route path="/quiz/:id" element={<QuizPage/>} />
        <Route path="/courses" element={<CoursePage/>}/>
        <Route path="/course/:id" element={<CourseDetailPage/>} />
        <Route path="/stream" element={<Stream/>} />
        <Route path="/addCourse" element={<CourseForm/>} />
        <Route path="/addQuiz" element={<QuizForm/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  </Provider>
  );
};

export default App;