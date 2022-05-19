import { GeoJsonLayer } from "@deck.gl/layers";

export default function getLineLayer(data) {
	if (data && data.features && data.features[0]) {
		const maxCommuters = Math.max.apply(
			Math,
			data.features.map(function (o) {
				return o.properties.commuters;
			}),
		);

		return new GeoJsonLayer({
			id: "geojson",
			data: data,
			opacity: 0.5,
			lineWidthMinPixels: 0.5,
			lineWidthMaxPixels: 30,
			getLineColor: [230, 5, 65],
			getLineWidth: d => 50 * (d.properties.commuters / maxCommuters),
			stroked: false,
			filled: true,
			pickable: true,
		});
	}
	return null;
}
