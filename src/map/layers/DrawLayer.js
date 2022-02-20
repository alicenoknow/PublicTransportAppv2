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

export function getDrawLayer(data, setStateData, updateFinalData, isStart) {
  const layer = new EditableGeoJsonLayer({
    id: `area-draw-layer-${isStart ? "start" : "end"}`,
    data: data,
    mode: DrawPolygonMode,
    selectedFeatureIndexes: [],
    getFillColor: isStart ? START_COLOR.fill : END_COLOR.fill,
    getLineColor: isStart ? START_COLOR.line : END_COLOR.line,
    onEdit: ({ updatedData }) => {
      if (updatedData.features.length > 0) {
        updateFinalData(updatedData.features[0].geometry.coordinates);

        if (updatedData.features.length > 1) {
          setStateData({
            type: updatedData.type,
            features: [updatedData.features[1]],
          });
          return;
        }
      }
      setStateData(updatedData);
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

export function drawAreas(startArea, endArea) {
  return new GeoJsonLayer({
    id: "geojson-layer-start",
    data: {
      type: "FeatureCollection",
      features: [getFeature(startArea, true), getFeature(endArea, false)],
    },
    pickable: true,
    stroked: true,
    filled: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: (d) =>
      d.properties.isStart ? START_COLOR.fill : END_COLOR.fill,
    getLineColor: (d) =>
      d.properties.isStart ? START_COLOR.line : END_COLOR.line,
  });
}
