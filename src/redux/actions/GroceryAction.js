import * as actionTypes from "./actionTypes";
import axios from "axios";

const uri = process.env.REACT_APP_CMS_URL;

export function loadGroceriesRequest() {
	return {
		type: actionTypes.LOAD_GROCERY_AUTOCOMPLETE_REQUEST,
		error: false,
		fetching: true,
		titles: [],
	};
}

export function loadGroceriesSuccess(titles) {
	return {
		type: actionTypes.LOAD_GROCERY_AUTOCOMPLETE_SUCCESS,
		error: false,
		fetching: false,
		titles: titles,
	};
}

export function loadGroceries(value = null) {
	return function (dispatch) {
		dispatch(loadGroceriesRequest());
		axios({
			method: "get",
			url: uri + "/groceries",
			params: {
				title: value,
			},
		}).then(function (response) {
			dispatch(loadGroceriesSuccess(response.data));
		});
	};
}

export function loadGroceriesWithStoreRequest() {
	return {
		type: actionTypes.LOAD_GROCERY_SEARCH_RESULTS_WITH_STORE_REQUEST,
		error: false,
		fetching: true,
		content: [],
	};
}

export function loadGroceriesWithStoreSuccess(search_results) {
	return {
		type: actionTypes.LOAD_GROCERY_SEARCH_RESULTS_WITH_STORE_SUCCESS,
		error: false,
		fetching: true,
		search_results,
	};
}

export function loadGroceryItemsWithStore(
	grocery_item,
	latitude = null,
	longitude = null
) {
	return function (dispatch) {
		dispatch(loadGroceriesWithStoreRequest());
		dispatch(saveGroceryItemQuery(grocery_item));
		axios({
			method: "get",
			url: uri + "/item/" + grocery_item[0].nid,
			params: {
				latitude: latitude,
				longitude: longitude,
			},
		}).then(function (response) {
			dispatch(loadGroceriesWithStoreSuccess(response.data));
		});
	};
}

export function saveGroceryItemQuery(grocery_item) {
	return {
		type: actionTypes.SAVE_GROCERY_ITEM_QUERY,
		grocery_item,
	};
}

export function loadDishesRequest() {
	return {
		type: actionTypes.LOAD_DISHES_REQUEST,
		fetching: true,
		error: null,
	};
}

export function loadDishesSuccess(data) {
	return {
		type: actionTypes.LOAD_DISHES_SUCCESS,
		fetching: false,
		error: false,
		dishes: data,
	};
}

export function loadDishes() {
	return function (dispatch) {
		dispatch(loadDishesRequest());
		axios({
			method: "get",
			url: uri + "/dishes",
		}).then(function (response) {
			console.log(response.data);
			dispatch(loadDishesSuccess(response.data));
		});
	};
}
