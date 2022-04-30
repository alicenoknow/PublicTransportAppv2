import {AnalysisType, StopsType} from '../redux/actionTypes';

function sendDataForAnalysis(state) {
    const filters = state.filters;
    const data = {
        startStopsType: state.startStopsType,
		endStopsType: state.endStopsType,
		startCoordinates: state.startAreaCoordinates,
		endCoordinates: state.endAreaCoordinates,
		startBusStop: state.startSingleBusStop,
		endBusStop: state.endSingleBusStop,
		analysisType: state.analysisType,
    }

    if (state.analysisType === AnalysisType.oneWay) {
        sendDataForOneWay(data, filters);
    } else {
        sendDataForTwoWay(data, filters);
    }
}

function sendDataForOneWay(data, filters) {
    return {
        departureSelector: getStops(data.startStopsType, data.startBusStop, data.startAreaCoordinates),
        arrivalSelector: getStops(data.endStopsType, data.endBusStop, data.endAreaCoordinates),
    }

}

function sendDataForTwoWay(data, filters) {
    
}

function getStops(stopsType, singleStop, coordinates) {
    if (stopsType === StopsType.all) {
        return {
            type: "busStation",
            ids: []
        }
    } else if (stopsType === StopsType.area) {
        return {
            type: "area",
            ids: coordinates
        }
    }
    return {
        type: "busStation",
        ids: [singleStop]
    }
}