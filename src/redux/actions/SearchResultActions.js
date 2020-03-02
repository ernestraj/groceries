import * as actionTypes from "./actionTypes";
import ApolloClient from "apollo-boost";

const uri = process.env.REACT_APP_CMS_URL;

const client = new ApolloClient({
	uri
});

export function loadSearchResultRequest() {
	return {
		type: actionTypes.LOAD_SEARCH_RESULT_REQUEST,
		error: false,
		fetching: true
	};
}

export function loadSearchResultSuccess(content) {
	return {
		type: actionTypes.LOAD_SEARCH_RESULT_SUCCESS,
		error: false,
		fetching: false,
		content
	};
}

export function getSearchResults() {
	return [];
}
