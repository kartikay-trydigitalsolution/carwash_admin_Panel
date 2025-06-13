import { all } from "redux-saga/effects";
import { watchStaffSaga } from "../features/staff/StaffSaga";
import { watchMachineSaga } from "../features/machine/MachineSaga";
import { watchInventorySaga } from "../features/inventory/InventorySaga";
import { watchAuthSaga } from "../features/auth/AuthSaga";
import { watchAssignTaskSaga } from "../features/assignTask/AssignTaskSaga";
import { watchStaffAssignTaskSaga } from "../features/staffAssignTask/StaffAssignTaskSaga";
import { watchToolkitAssignTaskSaga } from "../features/toolkitTask/ToolkitTaskSaga";
import { watchSendEmailSaga } from "../features/email/emailSaga";
import { watchMixDataSaga } from "../features/mixData/mixDataSaga";

export default function* rootSaga() {
  yield all([
    watchStaffSaga(),
    watchMachineSaga(),
    watchInventorySaga(),
    watchAuthSaga(),
    watchAssignTaskSaga(),
    watchStaffAssignTaskSaga(),
    watchToolkitAssignTaskSaga(),
    watchSendEmailSaga(),
    watchMixDataSaga()
  ]);
}
