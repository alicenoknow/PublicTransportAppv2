import { EditableGeoJsonLayer, DrawPolygonMode } from "nebula.gl";
import { GeoJsonLayer } from "deck.gl";

const START_COLOR = { fill: [255, 234, 167, 120], line: [204, 153, 59, 255] };
const END_COLOR = { fill: [85, 239, 196, 120], line: [0, 184, 148, 255] };
const EMPTY_FEATURE = {
	type: "Feature",
	geometry: {
		type: "Polygon",
		coordinates: [],
	},
	properties: {
		isStart: false,
	},
};

export function getDrawLayer(data, setStateData) {
	console.warn(data)
	const layer = new EditableGeoJsonLayer({
		id: "area-draw-layer",
		data: { type: "FeatureCollection", features: data },
		mode: DrawPolygonMode,
		selectedFeatureIndexes: [],
		getFillColor: END_COLOR.fill,
		getLineColor: END_COLOR.line,
		onEdit: ({ updatedData }) => {
			console.warn(updatedData.features)

			if (updatedData?.features && updatedData.features.length > 0) {
				console.warn(updatedData.features)
				setStateData(updatedData.features);
			}
		},
	});
	return layer;
}

function getFeature(area, isStart) {
	if (area?.features[0]?.geometry?.coordinates) {
		return {
			type: "Feature",
			geometry: {
				type: "Polygon",
				coordinates: area.features[0].geometry.coordinates,
			},
			properties: {
				isStart: isStart,
			},
		};
	}
	return EMPTY_FEATURE;
}
