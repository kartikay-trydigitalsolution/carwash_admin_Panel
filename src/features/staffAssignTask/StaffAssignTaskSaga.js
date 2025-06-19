import { call, put, takeLatest } from "redux-saga/effects";
import axios from "../../api/api";
import {
  fetchStaffAssignTaskRequest,
  fetchStaffAssignTaskSuccess,
  fetchStaffAssignTaskFailure,
  createStaffAssignTaskRequest,
  createStaffAssignTaskSuccess,
  createStaffAssignTaskFailure,
  updateStaffAssignedTaskRequest,
  updateStaffAssignedTaskSuccess,
  updateStaffAssignedTaskFailure,
  deleteStaffAssignedTaskSuccess,
  deleteStaffAssignedTaskFailure,
  deleteStaffAssignedTaskRequest,
} from "./StaffAssignTaskSlice"; // Update this to match your AssignTask slice

// FETCH
function* fetchStaffAssignTaskSaga() {
  try {
    const response = yield call(axios.get, "/staffassignTask/staffassignTask");
    yield put(fetchStaffAssignTaskSuccess(response.data));
  } catch (error) {
    yield put(fetchStaffAssignTaskFailure(error.message));
  }
}

// CREATE
function* createStaffAssignTaskSaga(action) {
  try {
    const response = yield call(
      axios.post,
      "/staffassigntask/staffassigntask",
      action.payload
    );
    yield put(createStaffAssignTaskSuccess(response.data));
  } catch (error) {
    yield put(createStaffAssignTaskFailure(error.message));
  }
}

// UPDATE
function* updateStaffAssignedTaskSaga(action) {
  try {
    const formData = action.payload; // No destructuring

    const response = yield call(
      axios.put,
      `/staffassignTask/updatestaffassigntask`,
      formData
    );

    yield put(updateStaffAssignedTaskSuccess(response.data));
  } catch (error) {
    yield put(updateStaffAssignedTaskFailure(error.message));
  }
}
// DELETE
function* deleteStaffAssignTaskSaga(action) {
  try {
    yield call(
      axios.delete,
      `/staffassigntask/staffassigntask/${action.payload}`
    );
    yield put(deleteStaffAssignedTaskSuccess(action.payload));
  } catch (error) {
    yield put(deleteStaffAssignedTaskFailure(error.message));
  }
}

export function* watchStaffAssignTaskSaga() {
  yield takeLatest(fetchStaffAssignTaskRequest.type, fetchStaffAssignTaskSaga);
  yield takeLatest(
    createStaffAssignTaskRequest.type,
    createStaffAssignTaskSaga
  );
  yield takeLatest(
    updateStaffAssignedTaskRequest.type,
    updateStaffAssignedTaskSaga
  );
  yield takeLatest(
    deleteStaffAssignedTaskRequest.type,
    deleteStaffAssignTaskSaga
  );
}
