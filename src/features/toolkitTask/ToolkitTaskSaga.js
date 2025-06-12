import { call, put, takeLatest } from "redux-saga/effects";
import axios from "../../api/api";
import {
  fetchToolKitAssignTaskRequest,
  fetchToolKitAssignTaskSuccess,
  fetchToolKitAssignTaskFailure,
  createToolKitAssignTaskRequest,
  createToolKitAssignTaskSuccess,
  createToolKitAssignTaskFailure,
} from "./ToolkitTaskSlice"; // Update this to match your AssignTask slice

// FETCH
function* fetchToolKitAssignTaskSaga() {
  try {
    const response = yield call(
      axios.get,
      "/toolkitAssignTask/toolkitAssignTask"
    );
    yield put(fetchToolKitAssignTaskSuccess(response.data));
  } catch (error) {
    yield put(fetchToolKitAssignTaskFailure(error.message));
  }
}

// CREATE
function* createToolKitAssignTaskSaga(action) {
  try {
    const response = yield call(
      axios.post,
      "/toolkitAssignTask/toolkitAssignTask",
      action.payload
    );
    yield put(createToolKitAssignTaskSuccess(response.data));
  } catch (error) {
    yield put(createToolKitAssignTaskFailure(error.message));
  }
}

export function* watchToolkitAssignTaskSaga() {
  yield takeLatest(
    fetchToolKitAssignTaskRequest.type,
    fetchToolKitAssignTaskSaga
  );
  yield takeLatest(
    createToolKitAssignTaskRequest.type,
    createToolKitAssignTaskSaga
  );
}
