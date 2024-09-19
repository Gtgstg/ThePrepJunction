import React from 'react';
import { connect } from 'react-redux';

const SearchResult = ({ searchResults }) => {
  return (
    <div className="search-result">
      <h2>Search Result</h2>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  searchResults: state.exams.searchResults
});

export default connect(mapStateToProps)(SearchResult);