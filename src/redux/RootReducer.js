import { combineReducers } from "redux";
import staffReducer from "../features/staff/StaffSlice";

const rootReducer = combineReducers({
  staff:staffReducer,
});

export default rootReducer;
