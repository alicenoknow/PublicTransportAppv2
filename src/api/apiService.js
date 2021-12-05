
const BUS_STOPS_URL = 'https://boiling-woodland-40919.herokuapp.com/bus_stops';
const LIST_FROM_URL = 'https://boiling-woodland-40919.herokuapp.com/going_from_list';
const AREA_FROM_URL = 'https://boiling-woodland-40919.herokuapp.com/going_from_area';
const AREA_TO_URL = 'https://boiling-woodland-40919.herokuapp.com/going_to_list';
const LIST_TO_URL = 'https://boiling-woodland-40919.herokuapp.com/going_to_area';



const fetchData = async (url, options, successHandler) => {
    fetch(url, options).then((response) => {
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
    const result = await fetchData(BUS_STOPS_URL, { "method": "GET", }, successHandler);
    return result; 
}

export const fetchFromList = (successHandler, filters) => {
    const options = { 
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(filters)
    }
    return fetchData(LIST_FROM_URL, options, successHandler)
}

export const fetchFromArea = (successHandler, filters) => {
    const options = { 
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(filters)
    }
    return fetchData(AREA_FROM_URL, options, successHandler)
}

export const fetchToList = (successHandler, filters) => {
    const options = { 
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(filters)
    }
    return fetchData(LIST_TO_URL, options, successHandler)
}

export const fetchToArea = (successHandler, filters) => {
    const options = { 
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(filters)
    }
    return fetchData(AREA_TO_URL, options, successHandler)
}

