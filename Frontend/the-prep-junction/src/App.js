import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CourseList from './components/course/CourseList';
import CourseDetails from './components/course/CourseDetails';
import CourseForm from './components/course/CourseForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/add-course" element={<CourseForm />} />
      </Routes>
    </Router>
  );
};

export default App;