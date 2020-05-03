import * as actionTypes from "./actionTypes";
import axios from "axios";

const uri = process.env.REACT_APP_CMS_URL;

export function loadBrandAutoCompleteRequest() {
	return {
		type: actionTypes.LOAD_BRAND_AUTOCOMPLETE_REQUEST,
		fetching: true,
		error: false,
	};
}

export function loadBrandAutoCompleteSuccess(brands) {
	return {
		type: actionTypes.LOAD_BRAND_AUTOCOMPLETE_SUCCESS,
		fetching: false,
		error: false,
		brands,
	};
}

export function getBrands() {
	return function (dispatch) {
		dispatch(loadBrandAutoCompleteRequest());
		axios({
			method: "get",
			url: uri + "/brands",
		}).then(function (response) {
			dispatch(loadBrandAutoCompleteSuccess(response.data));
		});
	};
}

export function loadAisleAutocompleteRequest() {
	return {
		type: actionTypes.LOAD_AISLE_AUTOCOMPLETE_REQUEST,
		fetching: true,
		error: false,
	};
}

export function loadAisleAutocompleteSuccess(aisles) {
	return {
		type: actionTypes.LOAD_AISLE_AUTOCOMPLETE_SUCCESS,
		fetching: false,
		error: false,
		aisles,
	};
}

export function getAisles(name = null) {
	return function (dispatch) {
		dispatch(loadAisleAutocompleteRequest);
		axios({
			method: "get",
			url: uri + "/aisles",
			data: {
				name,
			},
		}).then(function (response) {
			dispatch(loadAisleAutocompleteSuccess(response.data));
		});
	};
}

export function saveGroceryItemInProgress() {
	return {
		type: actionTypes.SAVE_GROCERY_ITEM_IN_PROGRESS,
		error: false,
		progress: true,
	};
}

export function saveGroceryItemSuccess() {
	return {
		type: actionTypes.SAVE_GROCERY_ITEM_SUCCESS,
		error: false,
		progress: false,
	};
}

export function saveGroceryItem(values) {
	return function (dispatch) {
		dispatch(saveGroceryItemInProgress());
		const {
			brand,
			brand_id,
			address,
			aisle,
			aisle_id,
			groceryName,
			grocery_id,
			description,
		} = values;

		const data = {
			brand,
			address: address.description,
			grocery: groceryName,
			aisle,
			description,
		};

		data.grocery_id = grocery_id ? grocery_id.nid : null;
		data.brand_id = brand_id ? brand_id.tid : null;
		data.aisle_id = aisle_id ? aisle_id.tid : null;
		console.log(data);
		axios
			.post(uri + "/item/create", data, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then(function (response) {
				dispatch(saveGroceryItemSuccess());
			})
			.catch((err) => {
				console.log(err);
			});
	};
}
