import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./RootReducer";
import rootSaga from "./RootSaga";

// 🔐 Persist config for only auth
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only auth will be persisted
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
  serializableCheck: {
    // Ignore specific paths or action types
    ignoredActionPaths: ["meta.navigate"],
  },
});

// ▶️ Run sagas
sagaMiddleware.run(rootSaga);

// 📦 Persistor
export const persistor = persistStore(store);

export default store;
