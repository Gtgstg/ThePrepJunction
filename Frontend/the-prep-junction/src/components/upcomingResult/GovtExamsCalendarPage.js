import React,{ useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchGovtExamsCalendarRequest } from '../../actions/calendarAction';

const GovtExamsCalendarPage = ({ fetchGovtExamsCalendarRequest }) => {
  useEffect(() => {
    fetchGovtExamsCalendarRequest();
  }, []);

  return (
    <div className="page">
      <h2>Govt Exams Calendar</h2>
      {/* Display govt exams calendar */}
    </div>
  );
};

export default connect(null, { fetchGovtExamsCalendarRequest })(GovtExamsCalendarPage);