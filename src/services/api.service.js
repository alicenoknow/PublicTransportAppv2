import axios from "axios";

axios.defaults.withCredentials = true;

const API = process.env.REACT_APP_API;

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
			return response;
		})
		.catch(function (error) {
			console.log(error);
			return error?.response?.status;
		});
};

export const fetchAreas = () => {
	const config = {
		method: "get",
		url: API + "/api/areas",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	};

	return axios(config)
		.then(function (response) {
			return response;
		})
		.catch(function (error) {
			console.log(error);
			return error?.response?.status;
		});
};
