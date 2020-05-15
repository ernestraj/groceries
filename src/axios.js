import axios from "axios";

const uri = process.env.REACT_APP_CMS_URL;
const grant_type = process.env.REACT_APP_GRANT_TYPE;
const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;

// Add a request interceptor
axios.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("ACCESS_TOKEN");
		if (token && config.url != "http://local.groceries-cms.com/oauth/token") {
			config.headers["Authorization"] = "Bearer " + token;
		}
		// config.headers['Content-Type'] = 'application/json';
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

//Add a response interceptor

axios.interceptors.response.use(
	(response) => {
		return response;
	},
	function (error) {
		const originalRequest = error.config;
		if (
			error.response.status === 401 &&
			originalRequest.url === "http://local.groceries-cms.com/oauth/token"
		) {
			//router.push("/login");
			return Promise.reject(error);
		}
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const refreshToken = localStorage.getItem("REFRESH_TOKEN");
			return axios
				.post(uri + "/oauth/token", {
					refresh_token: refreshToken,
					grant_type: "refresh_token",
					client_id,
					client_secret,
				})
				.then((res) => {
					if (res.status === 201) {
						localStorage.setItem("ACCESS_TOKEN", res.data.access_token);
						localStorage.setItem("REFRESH_TOKEN", res.data.refresh_token);
						localStorage.setItem("USER_ID", res.data.user_id);
						axios.defaults.headers.common["Authorization"] =
							"Bearer " + localStorage.getItem("ACCESS_TOKEN");
						return axios(originalRequest);
					}
				});
		}
		return Promise.reject(error);
	}
);
