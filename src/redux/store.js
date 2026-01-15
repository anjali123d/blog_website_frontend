// import { configureStore } from "@reduxjs/toolkit"
// import authSlice from "./authSlice"

// const store = configureStore({
//     reducer:{
//         auth:authSlice
//     }
// })

// export default store;

// import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import themeSlice from "./themeSlice";
import blogSlice from "./blogSlice";
import commentSlice from "./commentSlice"
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/es/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeSlice,
  blog: blogSlice,
  comment : commentSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     theme: themeSlice
//   },
// });

export default store;
