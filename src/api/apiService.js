
const BUS_STOPS_URL = 'https://boiling-woodland-40919.herokuapp.com/bus_stops';
const DISTRICTS_URL = 'https://boiling-woodland-40919.herokuapp.com/districts';
const CITIES_URL = 'https://boiling-woodland-40919.herokuapp.com/cities';


const fetchData = async (url, successHandler) => {
    fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong');
        }})
        .then((responseJson) => {
            successHandler && successHandler(responseJson);
            return;
        })
        .catch((error) => {
            console.log('Error ' + error);
            return;
    });
}


export const fetchBusStops = async (successHandler) => {
    const result = await fetchData(BUS_STOPS_URL, successHandler);
    return result; 
}

export const fetchDistricts = (successHandler) => {
    return fetchData(DISTRICTS_URL, successHandler)
}

export const fetchCities = (successHandler) => {
    const result = fetchData(CITIES_URL, successHandler);
    return result;
}
