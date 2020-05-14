import * as actionTypes from "./actionTypes";

export function loadSearchResultRequest() {
	return {
		type: actionTypes.LOAD_SEARCH_RESULT_REQUEST,
		error: false,
		fetching: true,
	};
}

export function loadSearchResultSuccess(content) {
	return {
		type: actionTypes.LOAD_SEARCH_RESULT_SUCCESS,
		error: false,
		fetching: false,
		content,
	};
}

export function getSearchResults() {
	return [];
}
