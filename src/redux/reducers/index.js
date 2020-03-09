import { combineReducers } from "redux";
import content from "./SearchResultReducer";
import titles from "./GroceryReducer";

const rootReducer = combineReducers({ content, titles });

export default rootReducer;
