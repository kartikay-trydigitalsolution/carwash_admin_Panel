import { combineReducers } from "redux";
import staffReducer from "../features/staff/StaffSlice";
import machineReducer from "../features/machine/MachineSlice";
import authReducer from "../features/auth/AuthSlice";
import inventoryReducer from "../features/inventory/InventorySlice";
import assignTaskReducer from "../features/assignTask/AssignTaskSlice";

const rootReducer = combineReducers({
  staff: staffReducer,
  machine: machineReducer,
  inventory: inventoryReducer,
  auth: authReducer,
  assignTask: assignTaskReducer,
});

export default rootReducer;
