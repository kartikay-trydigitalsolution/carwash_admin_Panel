import { call, put, takeLatest } from "redux-saga/effects";
import axios from "../../api/api";
import {
  fetchMixDataRequest,
  fetchMixDataSuccess,
  fetchMixDataFailure,
} from "./mixDataSlice"; // Update this to match your AssignTask slice

// FETCH
function* fetchMixDataSaga() {
  try {
    const data = yield call(axios.get, "/mixData/mixData");
    yield put(fetchMixDataSuccess(data));
  } catch (error) {
    console.error("Saga Error:", error);
    yield put(fetchMixDataFailure(error.message || "Unexpected error"));
  }
}

export function* watchMixDataSaga() {
  yield takeLatest(fetchMixDataRequest.type, fetchMixDataSaga);
}
