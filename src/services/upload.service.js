import axios from "axios";

axios.defaults.withCredentials = true;

const API = process.env.REACT_APP_API;

export const uploadFile = data => {
	const config = {
		method: "post",
		url: API + "/api/upload-csv",
		data: data,
		withCredentials: true,
	};

	return axios(config)
		.then(function (response) {
			return response?.status;
		})
		.catch(function (error) {
			console.log(error);
			return error?.response?.status;
		});
};
