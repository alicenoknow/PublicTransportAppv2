import { EditableGeoJsonLayer, DrawPolygonMode } from "nebula.gl";
import { GeoJsonLayer } from "deck.gl";

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
	const layer = new EditableGeoJsonLayer({
		id: "area-draw-layer",
		data: { type: "FeatureCollection", features: data },
		mode: DrawPolygonMode,
		selectedFeatureIndexes: [],
		getFillColor: [150, 190, 250, 120],
		getLineColor: [90, 120, 180, 255],
		pickable: true,
		pickingRadius: 15,
		onEdit: ({ updatedData }) => {
			if (updatedData?.features && updatedData.features.length > 0) {
				setStateData(updatedData.features);
			}
			if (updatedData?.features && updatedData.features.length > 1) {
				setStateData([updatedData.features[1]]);
			}
		},
	});
	return layer;
}
