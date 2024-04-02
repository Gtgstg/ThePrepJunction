import React from 'react';
import SearchBar from '../search/SearchBar';
import SearchResult from '../search/SearchResult';
import UpcomingExams from '../upcomingResult/UpcomingExamPage';
import GovtExamsCalendarPage from '../upcomingResult/GovtExamsCalendarPage';

const Home = () => {
  return (
    <div className="body">
      <div className="search-section">
        <SearchBar />
        <SearchResult />
      </div>
      <div className="calendar-section">
        <GovtExamsCalendarPage />
      </div>
      <div className="upcoming-exams-section">
        <UpcomingExams />
      </div>
    </div>
  );
};

export default Home;