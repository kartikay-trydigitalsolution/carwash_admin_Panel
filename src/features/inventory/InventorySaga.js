import { call, put, takeLatest } from "redux-saga/effects";
import axios from "../../api/api";
import {
  fetchInventoryRequest,
  fetchInventorySuccess,
  fetchInventoryFailure,
  createInventoryRequest,
  createInventorySuccess,
  createInventoryFailure,
  deleteInventoryRequest,
  deleteInventorySuccess,
  deleteInventoryFailure,
  updateInventoryRequest,
  updateInventorySuccess,
  updateInventoryFailure,
} from "./InventorySlice"; // Update this to match your inventory slice

// FETCH
function* fetchInventorySaga() {
  try {
    const response = yield call(axios.get, "/inventory/inventory");
    yield put(fetchInventorySuccess(response.data));
  } catch (error) {
    yield put(fetchInventoryFailure(error.message));
  }
}

// CREATE
function* createInventorySaga(action) {
  try {
    const response = yield call(
      axios.post,
      "/inventory/inventory",
      action.payload
    );
    yield put(createInventorySuccess(response.data));
  } catch (error) {
    yield put(createInventoryFailure(error.message));
  }
}

// DELETE
function* deleteInventorySaga(action) {
  try {
    yield call(axios.delete, `/inventory/inventory/${action.payload}`);
    yield put(deleteInventorySuccess(action.payload));
  } catch (error) {
    yield put(deleteInventoryFailure(error.message));
  }
}

// UPDATE
function* updateInventorySaga(action) {
  try {
    const { id, ...data } = action.payload;
    const response = yield call(axios.put, `/inventory/inventory/${id}`, data);
    yield put(updateInventorySuccess(response.data));
  } catch (error) {
    yield put(updateInventoryFailure(error.message));
  }
}

export function* watchInventorySaga() {
  yield takeLatest(fetchInventoryRequest.type, fetchInventorySaga);
  yield takeLatest(createInventoryRequest.type, createInventorySaga);
  yield takeLatest(deleteInventoryRequest.type, deleteInventorySaga);
  yield takeLatest(updateInventoryRequest.type, updateInventorySaga);
}
