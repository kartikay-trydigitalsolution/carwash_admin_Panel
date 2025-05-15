import { all } from "redux-saga/effects";
import { watchStaffSaga } from "../features/staff/StaffSaga";
import { watchMachineSaga } from "../features/machine/MachineSaga";
import { watchInventorySaga } from "../features/inventory/InventorySaga";

export default function* rootSaga() {
  yield all([watchStaffSaga(), watchMachineSaga(), watchInventorySaga()]);
}
