import React from 'react';
import SearchBar from '../search/SearchBar';
import SearchResult from '../search/SearchResult';
import UpcomingExams from '../upcomingResult/UpcomingExamPage';
import GovtExamsCalendarPage from '../upcomingResult/GovtExamsCalendarPage';
import Banner from './Banner';
import Highlights from './Highlights';
import PopularExam from './PopularExam';

const Home = () => {
  return (
    <div className="body">
      <Banner></Banner>
      <PopularExam></PopularExam>
      <Highlights></Highlights>
    </div>
  );
};

export default Home;