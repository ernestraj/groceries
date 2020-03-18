import { combineReducers } from "redux";
import content from "./SearchResultReducer";
import titles from "./GroceryReducer";
import { connectRouter } from "connected-react-router";
import brands from "./GroceryItemReducer";

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    content,
    titles,
    brands
  });

export default rootReducer;
