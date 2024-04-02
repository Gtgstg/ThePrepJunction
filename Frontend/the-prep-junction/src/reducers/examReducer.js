const initialState = {
    searchResults: [],
    loading: false,
    error: null
  };
  
  const examReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SEARCH_EXAMS_REQUEST':
        return { ...state, loading: true, error: null };
      case 'SEARCH_EXAMS_SUCCESS':
        return { ...state, searchResults: action.payload, loading: false };
      case 'SEARCH_EXAMS_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default examReducer;