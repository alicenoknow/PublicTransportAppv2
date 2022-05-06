import { HeatmapLayer } from "@deck.gl/aggregation-layers";

export default function getPointLayer(data) {
	return new HeatmapLayer({
		id: "heatmapLayer-layer",
		data: data,
		radiusPixels: 90,
		intensity: 4,
		getPosition: d => d.coordinates,
		getWeight: d => d.commuters * 100,
		aggregation: 'SUM'
	});
}
