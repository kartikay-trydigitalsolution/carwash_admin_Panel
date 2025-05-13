import { call, put, takeLatest } from "redux-saga/effects";
import axios from "../../api/api";
import {
  fetchRequest,
  fetchSuccess,
  fetchFailure,
  createRequest,
  createSuccess,
  createFailure,
  deleteRequest,
  deleteSuccess,
  deleteFailure,
} from "./StaffSlice";

function* fetchStaffSaga() {
  try {
    const response = yield call(axios.get, "/staff/staff");
    yield put(fetchSuccess(response.data)); // Using fetchSuccess from slice
  } catch (error) {
    yield put(fetchFailure(error.message)); // Using fetchFailure from slice
  }
}

function* createStaffSaga(action) {
  try {
    const response = yield call(axios.post, "/staff/staff", action.payload);
    yield put(createSuccess(response.data)); // Using createSuccess from slice
  } catch (error) {
    yield put(createFailure(error.message)); // Using createFailure from slice
  }
}

// DELETE
function* deleteStaffSaga(action) {
  try {
    yield call(axios.delete, `/staff/staff/${action.payload}`);
    yield put(deleteSuccess(action.payload)); // Use the same ID to update state
  } catch (error) {
    yield put(deleteFailure(error.message));
  }
}

export function* watchStaffSaga() {
  yield takeLatest(fetchRequest.type, fetchStaffSaga); // Using fetchRequest.type
  yield takeLatest(createRequest.type, createStaffSaga); // Using createRequest.type
  yield takeLatest(deleteRequest.type, deleteStaffSaga);
}
