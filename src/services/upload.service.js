import axios from "axios";

axios.defaults.withCredentials = true;

const API = process.env.REACT_APP_API;

export const uploadFile = file => {
	const data = JSON.stringify({
		file: file,
	});

	const config = {
		method: "post",
		url: API + "/api/upload-csv",
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
