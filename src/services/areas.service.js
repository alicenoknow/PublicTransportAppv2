import axios from "axios";

axios.defaults.withCredentials = true;

const API = process.env.REACT_APP_API;

export const deleteArea = (id) => {
	const config = {
		method: "delete",
		url: API + `/api/areas/${id}`,
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

export const addArea = (name, coordinates) => {
    const data = JSON.stringify({
        name: name,
        coordinates: coordinates,
    });


	const config = {
		method: "post",
		url: API + "/api/areas",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
        data: data,
	};

	return axios(config)
		.then(function (response) {
			return response?.data
		})
		.catch(function (error) {
			console.log(error);
			return;
		});
	};