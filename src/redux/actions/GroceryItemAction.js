import * as actionTypes from "./actionTypes";
import axios from "axios";

const uri = process.env.REACT_APP_CMS_URL;

export function loadBrandAutoCompleteRequest() {
  return {
    type: actionTypes.LOAD_BRAND_AUTOCOMPLETE_REQUEST,
    fetching: true,
    error: false
  };
}

export function loadBrandAutoCompleteSuccess(brands) {
  return {
    type: actionTypes.LOAD_BRAND_AUTOCOMPLETE_SUCCESS,
    fetching: false,
    error: false,
    brands
  };
}

export function getBrands() {
  return function(dispatch) {
    dispatch(loadBrandAutoCompleteRequest());
    axios({
      method: "get",
      url: uri + "/brands"
    }).then(function(response) {
      dispatch(loadBrandAutoCompleteSuccess(response.data));
    });
  };
}

export function loadAisleAutocompleteRequest() {
  return {
    type: actionTypes.LOAD_AISLE_AUTOCOMPLETE_REQUEST,
    fetching: true,
    error: false
  };
}

export function loadAisleAutocompleteSuccess(aisles) {
  return {
    type: actionTypes.LOAD_AISLE_AUTOCOMPLETE_SUCCESS,
    fetching: false,
    error: false,
    aisles
  };
}

export function getAisles(name = null) {
  return function(dispatch) {
    dispatch(loadAisleAutocompleteRequest);
    axios({
      method: "get",
      url: uri + "/aisles",
      data: {
        name
      }
    }).then(function(response) {
      dispatch(loadAisleAutocompleteSuccess(response.data));
    });
  };
}
