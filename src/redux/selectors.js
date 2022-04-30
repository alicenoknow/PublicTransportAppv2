export const getFilters = store => store.filters;
export const getDataForRequest = store => {
	return {
		startStopType: store.startStopsType,
		endStopsType: store.endStopsType,
		startCoordinates: store.startAreaCoordinates,
		endCoordinates: store.endAreaCoordinates,
		startBusStop: store.startSingleBusStop,
		endBusStop: store.endSingleBusStop,
		analysisType: store.analysisType,
	};
};
