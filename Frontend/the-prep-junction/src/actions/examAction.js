export const searchExamsRequest = (query) => ({
    type: 'SEARCH_EXAMS_REQUEST',
    payload: { query }
  });
  
  export const searchExamsSuccess = (searchResults) => ({
    type: 'SEARCH_EXAMS_SUCCESS',
    payload: searchResults
  });
  
  export const searchExamsFailure = (error) => ({
    type: 'SEARCH_EXAMS_FAILURE',
    payload: error
  });