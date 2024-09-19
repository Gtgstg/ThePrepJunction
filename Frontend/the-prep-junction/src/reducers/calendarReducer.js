const initialState = {
    govtExamsCalendar: []
  };
  
  const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_GOVT_EXAMS_CALENDAR':
        // Fetch govt exams calendar and update govtExamsCalendar in state
        return { ...state, govtExamsCalendar: [] }; // Placeholder, implement actual logic
      default:
        return state;
    }
  };
  
  export default calendarReducer;