import { combineReducers } from "redux";
import staffReducer from "../features/staff/StaffSlice";
import machineReducer from "../features/machine/MachineSlice";
import authReducer from "../features/auth/AuthSlice";
import inventoryReducer from "../features/inventory/InventorySlice";

const rootReducer = combineReducers({
  staff: staffReducer,
  machine: machineReducer,
  inventory: inventoryReducer,
  auth: authReducer,
});

export default rootReducer;
