import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./RootReducer";
import rootSaga from "./RootSaga";

const saveSubsetFilter = createTransform(
  // inbound: before saving to storage
  (inboundState, key) => {
    const whitelist = ["userData", "isLogging", "usertokken", "userRole"];
    return Object.keys(inboundState)
      .filter((k) => whitelist.includes(k))
      .reduce((obj, k) => {
        obj[k] = inboundState[k];
        return obj;
      }, {});
  },
  // outbound: when loading from storage
  (outboundState, key) => {
    return outboundState;
  },
  { whitelist: ["auth"] } // only applies to auth slice
);
// 🔐 Persist config for only auth
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only auth will be persisted
  transforms: [saveSubsetFilter],
};

// 🧩 Apply persistReducer to combined rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🔄 Saga middleware
const sagaMiddleware = createSagaMiddleware();

// 🏗 Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

// ▶️ Run sagas
sagaMiddleware.run(rootSaga);

// 📦 Persistor
export const persistor = persistStore(store);

export default store;
