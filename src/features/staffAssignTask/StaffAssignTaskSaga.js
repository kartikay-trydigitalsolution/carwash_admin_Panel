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
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    yield put(updateStaffAssignedTaskSuccess(response.data));
  } catch (error) {
    yield put(updateStaffAssignedTaskFailure(error.message));
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
}
