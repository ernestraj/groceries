import * as actionTypes from "./actionTypes";
import axios from "axios";

const uri = process.env.REACT_APP_CMS_URL;

export function userRegistrationInProgress() {
  return {
    type: actionTypes.USER_REGISTRATION_IN_PROGRESS,
    progress: true,
    error: false
  };
}

export function userRegistrationCatchError(msg) {
  return {
    type: actionTypes.USER_REGISTRATION_CATCH_ERROR,
    progress: true,
    error: msg
  };
}

export function userRegistrationSuccess(registrationSuccessful) {
  return {
    type: actionTypes.USER_REGISTRATION_SUCCESS,
    progress: false,
    error: false,
    registrationSuccessful
  };
}

export function registerUser(values) {
  return function(dispatch) {
    dispatch(userRegistrationInProgress());
    const { firstName, middleName, lastName, password, email } = values;

    axios
      .post(
        uri + "/user/register",
        {
          name: {
            value: email
          },
          mail: {
            value: email
          },
          pass: {
            value: password
          },
          field_first_name: {
            value: firstName
          },
          field_last_name: {
            value: lastName
          },
          field_middle_name: {
            value: middleName ? middleName : " "
          }
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
          params: {
            _format: "json"
          }
        }
      )
      .then(function(response) {
        console.log(response);
        dispatch(userRegistrationSuccess(true));
      })
      .catch(err => {
        let msg = "";
        if (err.response.data.message.split(":")[2]) {
          msg = "Email has already been taken.";
        }
        dispatch(userRegistrationCatchError(msg));
      });
  };
}
