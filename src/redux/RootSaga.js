import { all } from "redux-saga/effects";
import { watchStaffSaga } from "../features/staff/StaffSaga";

export default function* rootSaga() {
  yield all([ watchStaffSaga()]);
}
