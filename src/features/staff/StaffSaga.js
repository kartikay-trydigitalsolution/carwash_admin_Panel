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
  updateRequest,
  updateSuccess,
  updateFailure,
} from "./StaffSlice";

// FETCH
function* fetchStaffSaga() {
  try {
    const response = yield call(axios.get, "/staff/staff");
    yield put(fetchSuccess(response.data));
  } catch (error) {
    yield put(fetchFailure(error.message));
  }
}

// CREATE
function* createStaffSaga(action) {
  try {
    const response = yield call(axios.post, "/staff/staff", action.payload);
    yield put(createSuccess(response.data));
  } catch (error) {
    yield put(createFailure(error.message));
  }
}

// DELETE
function* deleteStaffSaga(action) {
  try {
    yield call(axios.delete, `/staff/staff/${action.payload}`);
    yield put(deleteSuccess(action.payload));
  } catch (error) {
    yield put(deleteFailure(error.message));
  }
}

// UPDATE
function* updateStaffSaga(action) {
  try {
    const { id, ...data } = action.payload;
    const response = yield call(axios.put, `/staff/staff/${id}`, data);
    yield put(updateSuccess(response.data));
  } catch (error) {
    yield put(updateFailure(error.message));
  }
}

export function* watchStaffSaga() {
  yield takeLatest(fetchRequest.type, fetchStaffSaga);
  yield takeLatest(createRequest.type, createStaffSaga);
  yield takeLatest(deleteRequest.type, deleteStaffSaga);
  yield takeLatest(updateRequest.type, updateStaffSaga); // new line for update
}
