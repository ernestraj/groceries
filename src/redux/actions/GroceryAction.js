import * as actionTypes from "./actionTypes";
import axios from "axios";

const uri = process.env.REACT_APP_CMS_URL;

export function loadGroceriesRequest() {
  return {
    type: actionTypes.LOAD_GROCERY_AUTOCOMPLETE_REQUEST,
    error: false,
    fetching: true,
    titles: []
  };
}

export function loadGroceriesSuccess(titles) {
  return {
    type: actionTypes.LOAD_GROCERY_AUTOCOMPLETE_SUCCESS,
    error: false,
    fetching: false,
    titles: titles
  };
}

export function loadGroceries(value = null) {
  return function(dispatch) {
    dispatch(loadGroceriesRequest());
    axios({
      method: "get",
      url: uri + "/groceries",
      params: {
        title: value
      }
    }).then(function(response) {
      dispatch(loadGroceriesSuccess(response.data));
    });
  };
}

export function loadGroceriesWithStoreRequest() {
  return {
    type: actionTypes.LOAD_GROCERY_SEARCH_RESULTS_WITH_STORE_REQUEST,
    error: false,
    fetching: true,
    content: []
  };
}

export function loadGroceriesWithStoreSuccess(content) {
  return {
    type: actionTypes.LOAD_GROCERY_SEARCH_RESULTS_WITH_STORE_SUCCESS,
    error: false,
    fetching: true,
    content
  };
}

export function loadGroceryITemsWithStore(nid = null) {
  return function(dispatch) {
    dispatch(loadGroceriesWithStoreRequest());
  };
}

export function saveGroceryItemQuery(grocery_item) {
  return {
    type: actionTypes.SAVE_GROCERY_ITEM_QUERY,
    grocery_item
  };
}
