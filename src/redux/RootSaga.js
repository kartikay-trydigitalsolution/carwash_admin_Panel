import { all } from "redux-saga/effects";
import { watchStaffSaga } from "../features/staff/StaffSaga";
import { watchMachineSaga } from "../features/machine/MachineSaga";

export default function* rootSaga() {
  yield all([watchStaffSaga(), watchMachineSaga()]);
}
