import React, { useState } from 'react';
import axios from 'axios';

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/courses/search?q=${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching courses:', error);
    }
  };

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map(course => (
          <li key={course._id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchForm;