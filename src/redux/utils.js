export function parseBusStopsToDict(data) {
	if (data && data.features && data.features[0]) {
		return Object.fromEntries(
			new Map(
				data.features.map(item => [
					item.properties.id,
					{
						id: item.properties.id,
						coordinates: item.geometry.coordinates,
						name: item.properties.name,
					},
				]),
			),
		);
	}
	return {};
}

export function parseAreasToDict(data) {
	if (data && data[0]) {
		return Object.fromEntries(
			new Map(data.map(item => [item.properties.id, item])),
		);
	}
	return {};
}
