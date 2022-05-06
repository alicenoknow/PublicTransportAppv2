import { GeoJsonLayer } from "@deck.gl/layers";

export default function getLineLayer(data) {
	if (data) {
		return new GeoJsonLayer({
			id: "geojson-highlight",
			data: {
				type: "FeatureCollection",
				features: [
					{
						type: "Feature",
						properties: {},
						geometry: {
							type: "LineString",
							coordinates: data,
						},
					},
				],
			},
			opacity: 0.5,
			lineWidthMinPixels: 0.5,
			lineWidthMaxPixels: 30,
			getLineColor: [50, 10, 255],
			getLineWidth: 50,
			stroked: false,
			filled: true,
		});
	}
	return null;
}
