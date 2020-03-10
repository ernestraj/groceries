import * as actionTypes from "../actions/actionTypes";
import initialState from "../initialState";

export default function searchResultReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_SEARCH_RESULT_SUCCESS:
      return {
        ...state,
        error: action.error,
        fetching: action.fetching,
        content: action.content
      };
      break;
    case actionTypes.LOAD_SEARCH_RESULT_REQUEST:
      return { ...state, error: action.error, fetching: action.fetching };
    default:
      return state;
  }
}
