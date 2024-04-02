import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CourseList from './components/course/CourseList';
import CourseDetails from './components/course/CourseDetails';
import CourseForm from './components/course/CourseForm';
import SearchForm from './components/search/SearchForm';
import RecommendationList from './components/recommendation/RecommendationList';
import LoginButton from './components/button/LoginButton';
import LogoutButton from './components/button/LogoutButton';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/body/Home';

const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
        <Header />
        <Routes>
        <Route exact path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  </Provider>
  );
};

export default App;