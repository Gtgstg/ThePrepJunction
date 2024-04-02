import { combineReducers } from 'redux';
import examReducer from './examReducer';
import calendarReducer from './calendarReducer';

const rootReducer = combineReducers({
  exams: examReducer,
  calendar: calendarReducer
});

export default rootReducer;