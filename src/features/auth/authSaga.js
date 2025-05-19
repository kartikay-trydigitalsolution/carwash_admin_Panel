import { call, put, takeLatest } from "redux-saga/effects";
import axios from "../../api/api";
import {
  fetchLoginRequest,
  fetchLoginSuccess,
  fetchLoginFailure,
} from "./authSlice"; // update path as needed

// Worker Saga
function* handleLogin(action) {
  try {
    const response = yield call(axios.post, "/login/login", action.payload);
    if (!response) {
      return;
    }
    yield put(fetchLoginSuccess(response));
    // optionally store token:
    localStorage.setItem("token", response.token);
  } catch (error) {
    yield put(
      fetchLoginFailure(error.response?.data?.message || "Login failed")
    );
  }
}

// Watcher Saga
export function* watchAuthSaga() {
  yield takeLatest(fetchLoginRequest.type, handleLogin);
}
