import { all } from 'redux-saga/effects';
import { watchSearchExams } from './examSaga';

export default function* rootSaga() {
  yield all([
    watchSearchExams()
    // Add more sagas here if needed
  ]);
}