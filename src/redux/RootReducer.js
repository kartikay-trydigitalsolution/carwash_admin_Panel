import { combineReducers } from "redux";
import staffReducer from "../features/staff/StaffSlice";
import machineReducer from "../features/machine/MachineSlice";
import authReducer from "../features/auth/AuthSlice";
import inventoryReducer from "../features/inventory/InventorySlice";
import assignTaskReducer from "../features/assignTask/AssignTaskSlice";
import staffAssignTaskReducer from "../features/staffAssignTask/StaffAssignTaskSlice";
import toolKitAssignTaskReducer from "../features/toolkitTask/ToolkitTaskSlice";

const rootReducer = combineReducers({
  staff: staffReducer,
  machine: machineReducer,
  inventory: inventoryReducer,
  auth: authReducer,
  assignTask: assignTaskReducer,
  staffAssignTask: staffAssignTaskReducer,
  toolkitAssignTask: toolKitAssignTaskReducer,
});

export default rootReducer;
