import { GeoJsonLayer } from "deck.gl";

const START_COLOR = { fill: [255, 234, 167, 120], line: [204, 153, 59, 255] };
const END_COLOR = { fill: [85, 239, 196, 120], line: [0, 184, 148, 255] };


export function drawAreas(areas) {
	return new GeoJsonLayer({
		id: "geojson-layer-areas",
		data: {
			type: "FeatureCollection",
			features: areas ?? [],
		},
		pickable: true,
		stroked: true,
		filled: true,
		lineWidthScale: 20,
		lineWidthMinPixels: 2,
		getFillColor: d =>
			d.properties.isStart ? START_COLOR.fill : END_COLOR.fill,
		getLineColor: d =>
			d.properties.isStart ? START_COLOR.line : END_COLOR.line,
	});
}
