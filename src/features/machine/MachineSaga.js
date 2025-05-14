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
} from "./MachineSlice";

// FETCH
function* fetchMachineSaga() {
  try {
    const response = yield call(axios.get, "/machine/machine");
    yield put(fetchSuccess(response.data));
  } catch (error) {
    yield put(fetchFailure(error.message));
  }
}

// CREATE
function* createMachineSaga(action) {
  try {
    const response = yield call(axios.post, "/machine/machine", action.payload);
    yield put(createSuccess(response.data));
  } catch (error) {
    yield put(createFailure(error.message));
  }
}

// DELETE
function* deleteMachineSaga(action) {
  try {
    yield call(axios.delete, `/machine/machine/${action.payload}`);
    yield put(deleteSuccess(action.payload));
  } catch (error) {
    yield put(deleteFailure(error.message));
  }
}

// UPDATE
function* updateMachineSaga(action) {
  try {
    const { id, ...data } = action.payload;
    const response = yield call(axios.put, `/machine/machine/${id}`, data);
    yield put(updateSuccess(response.data));
  } catch (error) {
    yield put(updateFailure(error.message));
  }
}

export function* watchMachineSaga() {
  yield takeLatest(fetchRequest.type, fetchMachineSaga);
  yield takeLatest(createRequest.type, createMachineSaga);
  yield takeLatest(deleteRequest.type, deleteMachineSaga);
  yield takeLatest(updateRequest.type, updateMachineSaga); // new line for update
}
