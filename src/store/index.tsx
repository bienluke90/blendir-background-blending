import { createStore } from "redux";
import rootReducer from "../reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* const store: any = createStore(
  rootReducer,
  window &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
); */

export let store = createStore(persistedReducer);
export let persistor = persistStore(store as any);
