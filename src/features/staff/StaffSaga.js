import { call, put, takeLatest } from "redux-saga/effects";
import axios from "../../api/api";
import {
  fetchStaffRequest,
  fetchStaffSuccess,
  fetchStaffFailure,
  createStaffRequest,
  createStaffSuccess,
  createStaffFailure,
  deleteStaffRequest,
  deleteStaffSuccess,
  deleteStaffFailure,
  updateStaffRequest,
  updateStaffSuccess,
  updateStaffFailure,
} from "./StaffSlice";

// FETCH
function* fetchStaffSaga() {
  try {
    const response = yield call(axios.get, "/staff/staff");
    yield put(fetchStaffSuccess(response.data));
  } catch (error) {
    yield put(fetchStaffFailure(error.message));
  }
}

// CREATE
function* createStaffSaga(action) {
  try {
    const response = yield call(axios.post, "/staff/staff", action.payload);
    yield put(createStaffSuccess(response.data));
  } catch (error) {
    yield put(createStaffFailure(error.message));
  }
}

// DELETE
function* deleteStaffSaga(action) {
  try {
    yield call(axios.delete, `/staff/staff/${action.payload}`);
    yield put(deleteStaffSuccess(action.payload));
  } catch (error) {
    yield put(deleteStaffFailure(error.message));
  }
}

// UPDATE
function* updateStaffSaga(action) {
  try {
    const { id, ...data } = action.payload;
    const response = yield call(axios.put, `/staff/staff/${id}`, data);
    yield put(updateStaffSuccess(response.data));
  } catch (error) {
    yield put(updateStaffFailure(error.message));
  }
}

export function* watchStaffSaga() {
  yield takeLatest(fetchStaffRequest.type, fetchStaffSaga);
  yield takeLatest(createStaffRequest.type, createStaffSaga);
  yield takeLatest(deleteStaffRequest.type, deleteStaffSaga);
  yield takeLatest(updateStaffRequest.type, updateStaffSaga); // new line for update
}
