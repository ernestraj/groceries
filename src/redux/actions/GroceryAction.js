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

export function saveGroceryItemQuery(grocery_item) {
  return {
    type: actionTypes.SAVE_GROCERY_ITEM_QUERY,
    grocery_item
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
