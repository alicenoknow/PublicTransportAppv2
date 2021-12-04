
const BUS_STOPS_URL = 'https://boiling-woodland-40919.herokuapp.com/bus_stops';
const DISTRICTS_URL = 'https://boiling-woodland-40919.herokuapp.com/districts';
const CITIES_URL = 'https://boiling-woodland-40919.herokuapp.com/cities';


const fetchData = (url, successHandler) => {
    fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong');
        }})
        .then((responseJson) => {
            console.log('Success ' + responseJson);
            successHandler && successHandler();
            return responseJson;
        })
        .catch((error) => {
            console.log('Error ' + error);
            alert("Cannot fetch data from server. Error: " + error);
            return null;
    });
}


export const fetchBusStops = (successHandler) => {
    return fetchData(BUS_STOPS_URL, successHandler)
}

export const fetchDistricts = (successHandler) => {
    return fetchData(DISTRICTS_URL, successHandler)
}

export const fetchCities = (successHandler) => {
    return fetchData(CITIES_URL, successHandler)
}
