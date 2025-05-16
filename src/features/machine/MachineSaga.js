import { call, put, takeLatest } from "redux-saga/effects";
import axios from "../../api/api";
import {
  fetchMachineRequest,
  fetchMachineSuccess,
  fetchMachineFailure,
  createMachineRequest,
  createMachineSuccess,
  createMachineFailure,
  deleteMachineRequest,
  deleteMachineSuccess,
  deleteMachineFailure,
  updateMachineRequest,
  updateMachineSuccess,
  updateMachineFailure,
} from "./MachineSlice";

// FETCH
function* fetchMachineSaga() {
  try {
    const response = yield call(axios.get, "/machine/machine");
    yield put(fetchMachineSuccess(response.data));
  } catch (error) {
    yield put(fetchMachineFailure(error.message));
  }
}

// CREATE
function* createMachineSaga(action) {
  try {
    const response = yield call(axios.post, "/machine/machine", action.payload);
    yield put(createMachineSuccess(response.data));
  } catch (error) {
    yield put(createMachineFailure(error.message));
  }
}

// DELETE
function* deleteMachineSaga(action) {
  try {
    yield call(axios.delete, `/machine/machine/${action.payload}`);
    yield put(deleteMachineSuccess(action.payload));
  } catch (error) {
    yield put(deleteMachineFailure(error.message));
  }
}

// UPDATE
function* updateMachineSaga(action) {
  try {
    const { id, ...data } = action.payload;
    const response = yield call(axios.put, `/machine/machine/${id}`, data);
    yield put(updateMachineSuccess(response.data));
  } catch (error) {
    yield put(updateMachineFailure(error.message));
  }
}

export function* watchMachineSaga() {
  yield takeLatest(fetchMachineRequest.type, fetchMachineSaga);
  yield takeLatest(createMachineRequest.type, createMachineSaga);
  yield takeLatest(deleteMachineRequest.type, deleteMachineSaga);
  yield takeLatest(updateMachineRequest.type, updateMachineSaga); // new line for update
}
