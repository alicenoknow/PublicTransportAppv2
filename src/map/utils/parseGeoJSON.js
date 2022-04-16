export function parseLinesToPoints(file) {
	if (file && file.features && file.features[0]) {
		return {
			type: "FeatureCollection",
			features: [
				{
					type: "Feature",
					properties: file.features[0].properties,
					geometry: {
						type: "Point",
						coordinates: file.features[0]?.geometry?.coordinates[0],
					},
				},
				...file.features.map(item => ({
					type: "Feature",
					properties: item?.properties,
					geometry: {
						type: "Point",
						coordinates: item.geometry?.coordinates[1],
					},
				})),
			],
		};
	}
	return [];
}
