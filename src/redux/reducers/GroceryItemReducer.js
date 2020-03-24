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

    case actionTypes.LOAD_BRAND_AUTOCOMPLETE_SUCCESS:
      return {
        ...state,
        error: action.error,
        fetching: action.fetching,
        brands: action.brands
      };

    case actionTypes.LOAD_AISLE_AUTOCOMPLETE_REQUEST:
      return {
        ...state,
        error: action.error,
        fetching: action.fetching
      };

    case actionTypes.LOAD_AISLE_AUTOCOMPLETE_SUCCESS:
      return {
        ...state,
        error: action.error,
        fetching: action.fetching,
        aisles: action.aisles
      };

    default:
      return state;
  }
}
