import { call, put, takeLatest } from "redux-saga/effects";
import axios from "../../api/api";
import {
  sendEmailRequest,
  sendEmailSuccess,
  sendEmailFailure,
} from "./emailSlice"; // Update this to match your inventory slice

// FETCH
function* sendEmailSaga(action) {
  try {
    const response = yield call(
      axios.post,
      "/staffassigntask/sendEmail",
      action.payload
    );
    yield put(sendEmailSuccess(response.data));
  } catch (error) {
    yield put(sendEmailFailure(error.message));
  }
}

export function* watchSendEmailSaga() {
  yield takeLatest(sendEmailRequest.type, sendEmailSaga);
}
