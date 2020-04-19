import { createStore } from "redux";
import rootReducer from "../reducers";
const store: any = createStore(
  rootReducer,
  window &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
