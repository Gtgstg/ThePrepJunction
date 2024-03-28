import React from 'react';

const CourseDetails = ({ course }) => {
  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      {/* Other course details */}
    </div>
  );
};

export default CourseDetails;