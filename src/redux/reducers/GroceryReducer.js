import * as actionTypes from "../actions/actionTypes";
import initialState from "../initialState";

export default function GroceryReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_GROCERY_AUTOCOMPLETE_REQUEST:
      return {
        ...state,
        error: action.error,
        fetching: action.fetching,
        titles: action.titles,
        grocery_item: action.grocery_item
      };
    case actionTypes.LOAD_GROCERY_AUTOCOMPLETE_SUCCESS:
      return {
        ...state,
        error: action.error,
        fetching: action.fetching,
        titles: action.titles,
        grocery_item: action.grocery_item
      };
    case actionTypes.SAVE_GROCERY_ITEM_QUERY:
      const state_object = { ...state, grocery_item: action.grocery_item };
      return state_object;
    default:
      return state;
  }
}
