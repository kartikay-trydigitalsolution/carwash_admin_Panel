import { call, put, takeLatest } from "redux-saga/effects";
import axios from "../../api/api";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "./authSlice"; // update path as needed

// Worker Saga
function* handleLogin(action) {
  try {
    const response = yield call(axios.post, "/login/login", action.payload);
    if (!response) {
      return;
    }
    yield put(loginSuccess(response));
    // optionally store token:
    localStorage.setItem("token", response.token);
  } catch (error) {
    yield put(
      loginFailure(error.response?.data?.message || "Login failed")
    );
  }
}

// Watcher Saga
export function* watchAuthSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}
