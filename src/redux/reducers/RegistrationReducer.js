import * as actionTypes from "../actions/actionTypes";
import initialState from "../initialState";

export default function GroceryReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.USER_REGISTRATION_IN_PROGRESS:
			return {
				...state,
				progress: action.progress,
				error: action.error,
			};

		case actionTypes.USER_REGISTRATION_SUCCESS:
			return {
				...state,
				progress: action.progress,
				error: action.error,
				registrationSuccessful: action.registrationSuccessful,
			};

		case actionTypes.USER_REGISTRATION_CATCH_ERROR:
			return {
				...state,
				progress: action.progress,
				error: action.error,
			};

		case actionTypes.USER_LOGIN_IN_PROGRESS:
			return {
				...state,
				progress: action.progress,
				error: action.error,
			};
		case actionTypes.USER_LOGIN_SUCCESS:
			return {
				...state,
				progress: action.progress,
				error: action.error,
				login: action.login,
			};
		case actionTypes.USER_INFO_SUCCESS:
			return {
				...state,
				progress: action.progress,
				error: action.error,
				user_data: action.user_data,
			};
		case actionTypes.USER_INFO_ERROR:
			return {
				...state,
				progress: action.progress,
				error: action.error,
			};
		case actionTypes.USER_LOGIN_IN_PROGRESS:
			return {
				...state,
				progress: action.progress,
				error: action.error,
			};
		default:
			return state;
	}
}
