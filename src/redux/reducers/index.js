import { combineReducers } from "redux";
import content from "./SearchResultReducer";
import titles from "./GroceryReducer";
import { connectRouter } from "connected-react-router";

const rootReducer = history =>
  combineReducers({ router: connectRouter(history), content, titles });

export default rootReducer;
