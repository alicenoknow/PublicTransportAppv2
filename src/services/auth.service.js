import axios from "axios";

// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
// axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
// axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

const API = process.env.REACT_APP_API;

export const login = (email, password) => {
	const data = JSON.stringify({
		username: email,
		password: password,
	});

	const config = {
		method: "get",
		url: API + "/token",
		withCredentials: true,
		headers: {
			"Content-Type": "application/json",
			// "Access-Control-Allow-Origin": "*",
		},
		data: data,
	};

	axios(config)
		.then(function (response) {
			console.log(JSON.stringify(response.data));
		})
		.catch(function (error) {
			console.log(error);
		});

};
