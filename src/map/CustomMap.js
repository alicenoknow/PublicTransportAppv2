import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { StopsType } from "../redux/actionTypes";
import {
  updateStartAreaCoordinates,
  updateEndAreaCoordinates,
} from "../redux/actions";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import DeckGL from "@deck.gl/react";
import { ScatterplotLayer, GeoJsonLayer } from "@deck.gl/layers";
import { EditableGeoJsonLayer, DrawPolygonMode } from "nebula.gl";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYWxpY2Vub2tub3ciLCJhIjoiY2txNDI3OXBnMGE2MDJwbXBvNXNic2N5eCJ9.JBfBgMVAkOOpQF7FMrpKSw";

const districts = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [18.51610928564713, 50.09143002369931],
            [18.52536634072591, 50.08676858488555],
            [18.53055849014396, 50.08416396206721],
            [18.53202948096439, 50.08350858909215],
            [18.53354783382574, 50.08308516941184],
            [18.53408140271497, 50.08297833800918],
            [18.5343477874004, 50.08380307821703],
            [18.53597162107512, 50.08540860933758],
            [18.53623854186587, 50.08626758913135],
            [18.53646440182722, 50.08672988118414],
            [18.53765561352838, 50.08773291094553],
            [18.53864296736381, 50.08868128702712],
            [18.5390727779014, 50.09002664799416],
            [18.53905447606581, 50.09073827680583],
            [18.53897308816303, 50.09114712867358],
            [18.53804768745956, 50.09143727634964],
            [18.53771819223232, 50.091793165198],
            [18.53759524037457, 50.09212296884073],
            [18.53753291691837, 50.09263678813006],
            [18.53811062416935, 50.09357478556012],
            [18.53813119883752, 50.09369352616932],
            [18.53773903931488, 50.09385028400356],
            [18.53753235963749, 50.0939543696437],
            [18.53817007786038, 50.0948515826401],
            [18.53815012988792, 50.09539292525449],
            [18.53712171835016, 50.09528600720618],
            [18.53685431807197, 50.09525896658625],
            [18.53662757955104, 50.09579693941625],
            [18.53447251522503, 50.09565638955699],
            [18.53447254611697, 50.09552468654264],
            [18.53070677393719, 50.09591275764107],
            [18.5295391291583, 50.09596601517838],
            [18.52711894241611, 50.09346538111119],
            [18.52328650786772, 50.09200737163827],
            [18.5202307986222, 50.09188787050473],
            [18.5182215615201, 50.09179590593021],
            [18.51610928564713, 50.09143002369931],
          ],
        ],
      },
      properties: { valuePerSqm: 4563, growth: 0.3592 },
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [18.53567409855608, 50.08290066306724],
            [18.53723880676596, 50.08285013324225],
            [18.53865070284865, 50.08285939580747],
            [18.53979253562342, 50.08283972524609],
            [18.54084528686986, 50.08270168554241],
            [18.54210359650586, 50.08215078996859],
            [18.54294458454054, 50.08494540326356],
            [18.54426657779322, 50.0864673694062],
            [18.54465839852906, 50.0863504942098],
            [18.54513904956877, 50.0868902125825],
            [18.54553347778058, 50.08681019106413],
            [18.54585895859934, 50.08725711251408],
            [18.54621863362944, 50.08739247866447],
            [18.54711735300681, 50.08762492307609],
            [18.54773979454529, 50.0876290137234],
            [18.54886865006539, 50.08796112504096],
            [18.55535481511884, 50.09082471352502],
            [18.55553411992015, 50.09201606991762],
            [18.5569555094047, 50.09297945185727],
            [18.56147810658895, 50.09544510472026],
            [18.56064828062141, 50.09575480484374],
            [18.55245319615592, 50.09711932075982],
            [18.55283138953851, 50.09825109433447],
            [18.55250643836058, 50.09904158741909],
            [18.54998133319788, 50.09873174509386],
            [18.54988758995185, 50.09959526725363],
            [18.54539618836946, 50.10017654703006],
            [18.54601859723481, 50.10178516054498],
            [18.54574814925683, 50.10201506359442],
            [18.54153783094562, 50.10215999750852],
            [18.54003759885329, 50.10211084526757],
            [18.53543036186241, 50.10048514858845],
            [18.53512900873612, 50.10013637872257],
            [18.53434623190506, 50.09992074913138],
            [18.53290153965337, 50.09891291048936],
            [18.53317562859166, 50.09803962160002],
            [18.53389860185042, 50.09715077891291],
            [18.53398998938514, 50.09633884065128],
            [18.53444158389918, 50.09574028119856],
            [18.53666701139187, 50.09593661845775],
            [18.53696815436784, 50.0953773490655],
            [18.53820390525734, 50.09549434648875],
            [18.53826377084481, 50.0948750805071],
            [18.53766087562234, 50.09399405062329],
            [18.5382945597926, 50.09367695212069],
            [18.53762968900391, 50.09253375655616],
            [18.53796260881635, 50.0915694389734],
            [18.53920811469732, 50.09117034910354],
            [18.5392277880638, 50.09037127185388],
            [18.53883630361207, 50.08872766387162],
            [18.5366020760759, 50.08674329774444],
            [18.53623908709389, 50.08609923247922],
            [18.53618451811006, 50.08545782986675],
            [18.53528072513364, 50.08457012305996],
            [18.53446723104597, 50.08383556825353],
            [18.53413801305092, 50.08305062110034],
            [18.53567409855608, 50.08290066306724],
          ],
        ],
      },
      properties: { valuePerSqm: 195, growth: 0.6525 },
    },
  ],
};

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
    drawData: {
      type: "FeatureCollection",
      features: [],
    },
  };

  renderBusStopsLayer = () => {
    return new ScatterplotLayer({
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
      getFillColor: (_d) => [255, 140, 0],
      getLineColor: (_d) => [0, 0, 0],
    });
  };

  renderTotalFlowLayer = () => {};

  renderServerDrivenLayer = () => {};

  renderDrawStartPointLayer = () => {
    const { startStopsType } = this.props.app;
    if (startStopsType !== StopsType.area) {
      return null;
    }
    const layer = new EditableGeoJsonLayer({
      id: "draw-layer",
      data: this.state.drawData,
      mode: DrawPolygonMode,
      selectedFeatureIndexes: [],
      getFillColor: [123, 145, 122, 180],
      getLineColor: [123, 145, 122, 255],
      onEdit: ({ updatedData }) => {
        if (updatedData.features.length > 0) {
          this.props.updateStartAreaCoordinates(
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
  };

  renderDrawEndPointLayer = () => {
    const { endStopsType } = this.props.app;
    if (endStopsType !== StopsType.area) {
      return null;
    }
    const layer = new EditableGeoJsonLayer({
      id: "draw-layer",
      data: this.state.drawData,
      mode: DrawPolygonMode,
      selectedFeatureIndexes: [],
      getFillColor: [123, 145, 122, 180],
      getLineColor: [123, 145, 122, 255],
      onEdit: ({ updatedData }) => {
        if (updatedData.features.length > 0) {
          this.props.updateEndAreaCoordinates(
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
    const layer = new GeoJsonLayer({
      id: "geojson",
      data: districts,
      opacity: 0.6,
      getFillColor: (d) =>
        d.properties.growth > 0.5 ? [255, 0, 0, 160] : [0, 123, 177, 160],
      getLineColor: [130, 200, 67, 240],
      stroked: true,
      filled: true,
      wireframe: true,
      extruded: true,
    });

    const layers = [
      layer,
      // this.renderBusStopsLayer(),
      // this.renderTotalFlowLayer(),
      // this.renderServerDrivenLayer(),
      this.renderDrawStartPointLayer(),
    ];

    return (
      <Container fluid className="p-0 bg-light">
        <DeckGL
          initialViewState={this.state.viewport}
          controller={true}
          layers={layers}
          getTooltip={({ object }) => object && object.name && `${object.name}`}
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
const dispatchToProps = {
  updateStartAreaCoordinates,
  updateEndAreaCoordinates,
};

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
