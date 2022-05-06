import axios from "axios";

axios.defaults.withCredentials = true;

const API = process.env.REACT_APP_API;

export const login = (email, password) => {
	const data = JSON.stringify({
		username: email,
		password: password,
	});

	const config = {
		method: "post",
		url: API + "/token",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		data: data,
	};

	return axios(config)
		.then(function (response) {
			return response?.status;
		})
		.catch(function (error) {
			console.log(error);
			return;
		});
	};

	export const requestPasswordReset = (email) => {
		const config = {
			method: "get",
			url: API + `/token/reset/${email}`,
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		};
	
		return axios(config)
			.then(function (response) {
				return response?.status;
			})
			.catch(function (error) {
				console.log(error);
				return;
			});
		};

	export const resetPassword = (email, password, magic) => {
		const data = JSON.stringify({
			username: email,
			password: password,
			magic: magic
		});

		const config = {
			method: "post",
			url: API + "/token/reset",
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
			withCredentials: true,
		};
	
		return axios(config)
			.then(function (response) {
				return response?.status;
			})
			.catch(function (error) {
				console.log(error);
				return;
			});
		};
