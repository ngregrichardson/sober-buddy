import { createStore } from "redux";
import rootReducer from "../reducers/rootReducer";

// Create the Redux store
const store = createStore(rootReducer);

export default store;
