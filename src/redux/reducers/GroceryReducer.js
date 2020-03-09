import * as actionTypes from "../actions/actionTypes";
import initialState from "../initialState";

export default function GroceryReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_GROCERY_AUTOCOMPLETE_REQUEST:
      return {
        ...state,
        error: action.error,
        fetching: action.fetching,
        titles: action.titles
      };
      break;
    case actionTypes.LOAD_GROCERY_AUTOCOMPLETE_SUCCESS:
      return {
        ...state,
        error: action.error,
        fetching: action.fetching,
        titles: action.titles
      };
    default:
      return state;
  }
}
