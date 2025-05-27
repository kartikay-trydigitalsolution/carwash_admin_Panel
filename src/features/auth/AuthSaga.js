import { call, put, takeLatest } from "redux-saga/effects";
import axios from "../../api/api";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  forgetPasswordRequest,
  forgetPasswordSuccess,
  forgetPasswordFailure,
  otpVerifyRequest,
  otpVerifySuccess,
  otpVerifyFailure,
  newPasswordRequest,
  // newPasswordSuccess,
  // newPasswordFailure,
} from "./AuthSlice"; // update path as needed

// Worker Saga
function* handleLogin(action) {
  try {
    const response = yield call(axios.post, "/auth/login", action.payload);
    if (!response) {
      return;
    }
    yield put(loginSuccess(response));
    // optionally store token:
    localStorage.setItem("token", response.token);
  } catch (error) {
    yield put(loginFailure(error.response?.data?.message || "Login failed!"));
  }
}

function* handleForgetPassword(action) {
  try {
    const response = yield call(
      axios.post,
      "/auth/forgetPassword",
      action.payload
    );
    if (!response) {
      return;
    }
    yield put(forgetPasswordSuccess(response));
  } catch (error) {
    yield put(
      forgetPasswordFailure(
        error.response?.data?.message || "Forgot password failed!"
      )
    );
  }
}

function* handleOtpCheck(action) {
  try {
    const response = yield call(axios.post, "/auth/otpVerify", action.payload);
    if (!response) {
      return;
    }
    yield put(otpVerifySuccess(response));
  } catch (error) {
    yield put(
      otpVerifyFailure(error.response?.data?.message || "OTP verify failed!")
    );
  }
}

function* handleSetNewPassword(action) {
  try {
    const response = yield call(
      axios.post,
      "/auth/resetPassword",
      action.payload
    );
    if (!response) {
      return;
    }
    yield put(otpVerifySuccess(response));
  } catch (error) {
    yield put(
      otpVerifyFailure(error.response?.data?.message || "OTP verify failed!")
    );
  }
}

// Watcher Saga
export function* watchAuthSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(forgetPasswordRequest.type, handleForgetPassword);
  yield takeLatest(otpVerifyRequest.type, handleOtpCheck);
  yield takeLatest(newPasswordRequest.type, handleSetNewPassword);
}
