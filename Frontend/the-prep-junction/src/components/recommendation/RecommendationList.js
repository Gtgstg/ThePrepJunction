import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecommendationList = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`/api/recommendations/${userId}`);
        setRecommendations(response.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return (
    <div>
      <h2>Recommendations</h2>
      <ul>
        {recommendations.map(course => (
          <li key={course._id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationList;