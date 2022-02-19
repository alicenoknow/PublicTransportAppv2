import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import ReactMapGL from "react-map-gl";
import { StopsType } from "../redux/actionTypes";
import { updateCoordinates } from "../redux/actions";
import "mapbox-gl/dist/mapbox-gl.css";
import DeckGL from "@deck.gl/react";
import { ScatterplotLayer, ArcLayer } from "@deck.gl/layers";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYWxpY2Vub2tub3ciLCJhIjoiY2txNDI3OXBnMGE2MDJwbXBvNXNic2N5eCJ9.JBfBgMVAkOOpQF7FMrpKSw";

class CustomMap extends Component {
  state = {
    viewport: {
      latitude: 50.1021742,
      longitude: 18.5462847,
      zoom: 13,
    },
    popUpCoordinates: [0.0, 0.0],
    showPopUp: false,
    popUpText: "",
  };
  onDrawUpdate = ({ features }) => {
    this.props.updateCoordinates(features[0].geometry.coordinates);
  };

  onClickUpdate = (clickEvent) => {
    const { app, updateCoordinates, pointData } = this.props;
    const coords = [
      parseFloat(Number(clickEvent.lngLat.lng).toFixed(3)),
      parseFloat(Number(clickEvent.lngLat.lat).toFixed(3)),
    ];
    const cut = pointData.features?.map((item) => [
      parseFloat(Number(item.geometry.coordinates[0]).toFixed(3)),
      parseFloat(Number(item.geometry.coordinates[1]).toFixed(3)),
      item.properties.id,
      item.properties.name,
    ]);
    const filtered = cut.filter(
      (item) => item[0] === coords[0] && item[1] === coords[1]
    );
    if (!filtered || !filtered[0]) return;
    if (app.stopsType === StopsType.one) {
      updateCoordinates(filtered[0][2]);
    }
    if (filtered[0].length < 4) {
      return;
    }
    this.setState({
      popUpCoordinates: {
        lon: clickEvent.lngLat.lng,
        lat: clickEvent.lngLat.lat,
      },
      showPopUp: true,
      popUpText: filtered[0][3],
    });
  };

  render() {
    const busStopsLayer = new ScatterplotLayer({
      id: "scatterplot-layer",
      data: [],
      pickable: true,
      opacity: 0.7,
      stroked: true,
      filled: true,
      radiusScale: 6,
      radiusMinPixels: 1,
      radiusMaxPixels: 100,
      lineWidthMinPixels: 1,
      getPosition: (d) => d.coordinates,
      getRadius: (d) => Math.sqrt(d.exits),
      getFillColor: (d) => [255, 140, 0],
      getLineColor: (d) => [0, 0, 0],
    });
    const connectionsLayer = null;
    const layers = [busStopsLayer, connectionsLayer];

    return (
      <Container fluid className="p-0 bg-light">
        <DeckGL
          initialViewState={this.state.viewport}
          controller={true}
          layers={layers}
          getTooltip={({ object }) => object && `${object.name}`}
        >
          <ReactMapGL
            mapboxApiAccessToken={MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            width={window.innerWidth}
            height={window.innerHeight}
            onViewportChange={(viewport) => this.setState({ viewport })}
          />
        </DeckGL>
      </Container>
    );
  }
}

const mapStateToProps = (state) => state;
const dispatchToProps = { updateCoordinates };

export default connect(mapStateToProps, dispatchToProps)(CustomMap);

/* <Map
                    style="mapbox://styles/mapbox/streets-v9"
                    zoom={[13]}
                    center={[18.5462847, 50.1021742,]}
                    containerStyle={{
                        height: window.innerHeight,
                        width: window.innerWidth,
                    }}>
                    {renderHeatMapFrom && data && <LineLayer data={data} />}
                    {renderBaseMap && <PointLayer data={pointData} onClickUpdate={this.onClickUpdate} />}
                    {renderBaseMap && linesData.length !== 0 && <HeatmapLayer data={parseLinesToPoints(linesData)} />}
                    {app.stopsType === StopsType.area && <DrawControl 
                            ref={(drawControl) => { this.drawControl = drawControl; }}
                            defaultMode='draw_polygon'
                            displayControlsDefault={false}
                            onDrawCreate={this.onDrawUpdate} onDrawUpdate={this.onDrawUpdate}
                            />}
                    {showPopUp && <Popup coordinates={{lat: popUpCoordinates.lat, lon: popUpCoordinates.lon}}
                                    onClick={() => this.setState({ showPopUp: false })}
                                    style={{fontSize: 12}}
                                    >
                                    <h1>{popUpText}</h1>
                    </Popup>}
                </Map>; */
