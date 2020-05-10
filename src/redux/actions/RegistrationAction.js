import * as actionTypes from "./actionTypes";
import axios from "axios";
import qs from "querystring";

const uri = process.env.REACT_APP_CMS_URL;
const grant_type = process.env.REACT_APP_GRANT_TYPE;
const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;

export function userRegistrationInProgress() {
	return {
		type: actionTypes.USER_REGISTRATION_IN_PROGRESS,
		progress: true,
		error: false,
	};
}

export function userRegistrationCatchError(msg) {
	return {
		type: actionTypes.USER_REGISTRATION_CATCH_ERROR,
		progress: true,
		error: msg,
	};
}

export function userRegistrationSuccess(registrationSuccessful) {
	return {
		type: actionTypes.USER_REGISTRATION_SUCCESS,
		progress: false,
		error: false,
		registrationSuccessful,
	};
}

export function registerUser(values) {
	return function (dispatch) {
		dispatch(userRegistrationInProgress());
		const { firstName, middleName, lastName, password, email } = values;
		axios
			.post(
				uri + "/user/register",
				{
					name: {
						value: email,
					},
					mail: {
						value: email,
					},
					pass: {
						value: password,
					},
					field_first_name: {
						value: firstName,
					},
					field_last_name: {
						value: lastName,
					},
					field_middle_name: {
						value: middleName ? middleName : " ",
					},
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
					params: {
						_format: "json",
					},
				}
			)
			.then(function (response) {
				dispatch(userRegistrationSuccess(true));
			})
			.catch((err) => {
				let msg = "";
				if (err.response.data.message.split(":")[2]) {
					msg = "Email has already been taken.";
				}
				dispatch(userRegistrationCatchError(msg));
			});
	};
}

export function userLoginInProgress() {
	return {
		type: actionTypes.USER_LOGIN_IN_PROGRESS,
		progress: true,
		error: false,
	};
}

export function userLoginSuccess(login) {
	return {
		type: actionTypes.USER_LOGIN_SUCCESS,
		progress: false,
		error: false,
		login,
	};
}

export function getUserInfo(user_id) {
	return function (dispatch) {
		axios
			.get(uri + "/user/" + user_id, {
				params: {
					_format: "json",
				},
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then(function (response) {
				console.log(response);
			});
	};
}

export function loginUser(values) {
	return function (dispatch) {
		dispatch(userLoginInProgress());
		const { email, password } = values;
		const data = {
			grant_type,
			client_id,
			client_secret,
			username: email,
			password,
		};
		axios
			.post(uri + "/oauth/token", qs.stringify(data), {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			})
			.then(function (response) {
				localStorage.setItem("ACCESS_TOKEN", response.data.access_token);
				localStorage.setItem("REFRESH_TOKEN", response.data.refresh_token);
				localStorage.setItem("USER_ID", response.data.user_id);
				dispatch(userLoginSuccess(true));
			})
			.catch((err) => {
				let msg = "";
				if (err.response.data.message.split(":")[2]) {
					msg = "Email has already been taken.";
				}
				dispatch(userRegistrationCatchError(msg));
			});
	};
}
