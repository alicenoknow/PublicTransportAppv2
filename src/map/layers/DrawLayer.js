import { EditableGeoJsonLayer, DrawPolygonMode } from "nebula.gl";

export function getDrawLayer(data, updateData) {
  const layer = new EditableGeoJsonLayer({
    id: "start-area-draw-layer",
    data: data,
    mode: DrawPolygonMode,
    selectedFeatureIndexes: [],
    getFillColor: [123, 145, 122, 180],
    getLineColor: [123, 145, 122, 255],
    onEdit: ({ updatedData }) => {
      if (updatedData.features.length > 0) {
        this.props.updateCoordinates(
          updatedData.features[0].geometry.coordinates
        );

        if (updatedData.features.length > 1) {
          this.setState({
            drawData: {
              type: updatedData.type,
              features: [updatedData.features[1]],
            },
          });
          return;
        }
      }
      this.setState({ drawData: updatedData });
    },
  });
  return layer;
}
