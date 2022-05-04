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
			const status =  JSON.stringify(response.status);
			return status;
		})
		.catch(function (error) {
			console.log(error);
			return;
		});
	};

	export const fetchBusStops = () => {
		const config = {
			method: "get",
			url: API + "/api/stops",
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		};
	
		return axios(config)
			.then(function (response) {
				const data =  JSON.stringify(response?.data);
				return data;
			})
			.catch(function (error) {
				console.log(error);
				return;
			});
		};
