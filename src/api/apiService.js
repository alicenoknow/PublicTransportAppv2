
const BUS_STOPS_URL = 'https://boiling-woodland-40919.herokuapp.com/bus_stops';
const FROM_URL = 'https://boiling-woodland-40919.herokuapp.com/going_from_list';


const fetchData = async (url, options, successHandler) => {
    fetch(url, options).then((response) => {
        if (response.ok) {
            alert('yas')
            return response.json();
        } else {
            alert('ajajaj')
            throw new Error('Something went wrong');
        }})
        .then((responseJson) => {
            successHandler && successHandler(responseJson);
            console.warn(responseJson)
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

export const fetchFrom = (successHandler, filters) => {
    const options = { 
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(filters)
    }
    return fetchData(FROM_URL, options, successHandler)
}
