import { call, put, takeLatest } from 'redux-saga/effects';
import { searchExamsSuccess, searchExamsFailure } from '../actions/examAction';
import { SEARCH_EXAMS_REQUEST } from '../actions/types';
import { searchExamsApi } from '../api/ExamAPI';

function* searchExams(action) {
  try {
    const { query } = action.payload;
    const response = yield call(searchExamsApi, query);
    yield put(searchExamsSuccess(response.data));
  } catch (error) {
    yield put(searchExamsFailure(error));
  }
}

export function* watchSearchExams() {
  yield takeLatest(SEARCH_EXAMS_REQUEST, searchExams);
}