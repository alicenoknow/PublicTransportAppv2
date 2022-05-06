export function parseLinesToPoints(features, destination) {
	if (features && features[0]) {
		return features.map(item => ({
			coordinates: item.geometry.coordinates[destination],
			commuters: item.properties.commuters,
			id: item.properties.id,
		}));
	}
	return [];
}

export function parsePointsToScatterPlotData(data) {
	return Object.values(data);
}

export function parseGeoJsonToLinePlotData(features) {
	if (features && features[0]) {
		return features.map(item => ({
			coordinates: {
				from: item.geometry.coordinates[0],
				to: item.geometry.coordinates[1],
			},
			commuters: item.properties.commuters,
			id: item.properties.id,
		}));
	}
	return [];
}

export function getDataPointsFromIds(ids, busStopsDict) {
	if (ids && ids[0]) {
		return ids.map(item => busStopsDict[item]);
	}
}

export function parseArrayToGeoJsonLines(data) {}

export function parseArrayToHeatmap(data, dataDict) {
	return data.map(item => {
		const startStop = dataDict[item.beginStop];
		return {
			coordinates: startStop.coordinates,
			commuters: item.passengers,
			id: item.beginStop,
		};
	});
}
