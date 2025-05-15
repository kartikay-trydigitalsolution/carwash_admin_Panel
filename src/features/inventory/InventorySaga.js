import { call, put, takeLatest } from "redux-saga/effects";
import axios from "../../api/api";
import {
  fetchRequest,
  fetchSuccess,
  fetchFailure,
  createRequest,
  createSuccess,
  createFailure,
  deleteRequest,
  deleteSuccess,
  deleteFailure,
  updateRequest,
  updateSuccess,
  updateFailure,
} from "./InventorySlice"; // Update this to match your inventory slice

// FETCH
function* fetchInventorySaga() {
  try {
    const response = yield call(axios.get, "/inventory/inventory");
    yield put(fetchSuccess(response.data));
  } catch (error) {
    yield put(fetchFailure(error.message));
  }
}

// CREATE
function* createInventorySaga(action) {
  try {
    console.log("kartik");
    const response = yield call(
      axios.post,
      "/inventory/inventory",
      action.payload
    );
    yield put(createSuccess(response.data));
  } catch (error) {
    yield put(createFailure(error.message));
  }
}

// DELETE
function* deleteInventorySaga(action) {
  try {
    yield call(axios.delete, `/inventory/inventory/${action.payload}`);
    yield put(deleteSuccess(action.payload));
  } catch (error) {
    yield put(deleteFailure(error.message));
  }
}

// UPDATE
function* updateInventorySaga(action) {
  try {
    const { id, ...data } = action.payload;
    const response = yield call(axios.put, `/inventory/inventory/${id}`, data);
    yield put(updateSuccess(response.data));
  } catch (error) {
    yield put(updateFailure(error.message));
  }
}

export function* watchInventorySaga() {
  yield takeLatest(fetchRequest.type, fetchInventorySaga);
  yield takeLatest(createRequest.type, createInventorySaga);
  yield takeLatest(deleteRequest.type, deleteInventorySaga);
  yield takeLatest(updateRequest.type, updateInventorySaga);
}
