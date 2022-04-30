import axios from "axios";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

const API = process.env.REACT_APP_API;


export const fetchBusStops = (
    ) => {
        console.warn("asdas")
        return axios
            .get(API + "/api/stops")
            .catch(function (error) {
                console.log(error.toJSON());
                return undefined;
            })
            .then(response => {
                return response?.data;
            });
    };

export const fetchAreas = (
    ) => {
        console.warn("asdas")
        return axios
            .get(API + "/api/stops")
            .catch(function (error) {
                console.log(error.toJSON());
                return undefined;
            })
            .then(response => {
                return response?.data;
            });
    };