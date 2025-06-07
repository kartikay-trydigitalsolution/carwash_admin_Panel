import { call, put, takeLatest } from "redux-saga/effects";
import axios from "../../api/api";
import {
  fetchAssignTaskRequest,
  fetchAssignTaskSuccess,
  fetchAssignTaskFailure,
  createAssignTaskRequest,
  createAssignTaskSuccess,
  createAssignTaskFailure,
  deleteAssignTaskRequest,
  deleteAssignTaskSuccess,
  deleteAssignTaskFailure,
  updateAssignTaskRequest,
  updateAssignTaskSuccess,
  updateAssignTaskFailure,
} from "./AssignTaskSlice"; // Update this to match your AssignTask slice

// FETCH
function* fetchAssignTaskSaga() {
  try {
    const response = yield call(axios.get, "/assignTask/assignTask");
    yield put(fetchAssignTaskSuccess(response.data));
  } catch (error) {
    yield put(fetchAssignTaskFailure(error.message));
  }
}

// CREATE
function* createAssignTaskSaga(action) {
  try {
    const response = yield call(
      axios.post,
      "/assigntask/assigntask",
      action.payload
    );
    yield put(createAssignTaskSuccess(response.data));
  } catch (error) {
    yield put(createAssignTaskFailure(error.message));
  }
}

// DELETE
function* deleteAssignTaskSaga(action) {
  try {
    yield call(axios.delete, `/AssignTask/AssignTask/${action.payload}`);
    yield put(deleteAssignTaskSuccess(action.payload));
  } catch (error) {
    yield put(deleteAssignTaskFailure(error.message));
  }
}

// // UPDATE
function* updateAssignTaskSaga(action) {
  try {
    const { id, ...data } = action.payload;
    const response = yield call(
      axios.put,
      `/AssignTask/AssignTask/${id}`,
      data
    );
    yield put(updateAssignTaskSuccess(response.data));
  } catch (error) {
    yield put(updateAssignTaskFailure(error.message));
  }
}

export function* watchAssignTaskSaga() {
  yield takeLatest(fetchAssignTaskRequest.type, fetchAssignTaskSaga);
  yield takeLatest(createAssignTaskRequest.type, createAssignTaskSaga);
  yield takeLatest(deleteAssignTaskRequest.type, deleteAssignTaskSaga);
  yield takeLatest(updateAssignTaskRequest.type, updateAssignTaskSaga);
}
