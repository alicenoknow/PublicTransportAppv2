export function parseLinesToPoints(features, destination) {
	if (features && features[0]) {
		return features.map(item => ({
			coordinates: item.geometry.coordinates[destination],
			commuters: item.properties.commuters,
			id: item.properties.id
		}));
	}
	return [];
}

export function parsePointsToScatterPlotData(features) {
	if (features && features[0]) {
		return features.map(item => ({
			coordinates: item.geometry.coordinates,
			name: item.properties.name,
			id: item.properties.id
		}));
	}
	return [];
}

export function parseGeoJsonToLinePlotData(features) {
	if (features && features[0]) {
		return features.map(item => ({
			coordinates: {
				from: item.geometry.coordinates[0],
				to: item.geometry.coordinates[1],
			},
			commuters: item.properties.commuters,
			id: item.properties.id
		}));
	}
	return [];
}
