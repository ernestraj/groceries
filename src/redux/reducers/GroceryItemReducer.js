import * as actionTypes from "../actions/actionTypes";
import initialState from "../initialState";

export default function GroceryItemReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_BRAND_AUTOCOMPLETE_REQUEST:
      return {
        ...state,
        error: action.error,
        fetching: action.fetching
      };

    case actionTypes.LOAD_BRAND_CUSTOMPLETE_SUCCESS:
      return {
        ...state,
        error: action.error,
        fetching: action.fetching,
        brands: action.brands
      };

    default:
      return state;
  }
}
