import { combineReducers } from "redux";
import staffReducer from "../features/staff/StaffSlice";
import machineReducer from "../features/machine/MachineSlice";

const rootReducer = combineReducers({
  staff: staffReducer,
  machine: machineReducer,
});

export default rootReducer;
