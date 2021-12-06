import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import DrawControl from 'react-mapbox-gl-draw';
import { connect } from 'react-redux';
import PointLayer from './PointLayer';
import LineLayer from './LineLayer';
import HeatmapLayer from './HeatmapLayer';
import { parseLinesToPoints } from './utils/parseGeoJSON';
import ReactMapboxGl, { Popup } from 'react-mapbox-gl';
import { StopsType } from '../redux/actionTypes';
import { updateCoordinates } from '../redux/actions';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWxpY2Vub2tub3ciLCJhIjoiY2txNDI3OXBnMGE2MDJwbXBvNXNic2N5eCJ9.JBfBgMVAkOOpQF7FMrpKSw';


const Map = ReactMapboxGl({
    accessToken:
    MAPBOX_TOKEN
  });

class CustomMap extends Component {   
    state = {
        popUpCoordinates: [0.0, 0.0],
        showPopUp: false,
        popUpText: '',

    }
    onDrawUpdate = ({ features }) => {
        this.props.updateCoordinates(features[0].geometry.coordinates);
    };

    onClickUpdate = (clickEvent) => {
        const { app, updateCoordinates, pointData } = this.props;
        const coords = [parseFloat(Number(clickEvent.lngLat.lng).toFixed(3)), parseFloat(Number(clickEvent.lngLat.lat).toFixed(3))]
        const cut = pointData.features?.map(item => [parseFloat(Number(item.geometry.coordinates[0]).toFixed(3)), parseFloat(Number(item.geometry.coordinates[1]).toFixed(3)), item.properties.id, item.properties.name])
        const filtered = cut.filter(item => item[0] === coords[0] && item[1] === coords[1]);
        
        if(!filtered || !filtered[0]) return;
        if (app.stopsType === StopsType.one) {
            updateCoordinates(filtered[0][2] + 1);
        }
        if (filtered[0].length < 4) {
            return;
        }
        this.setState({ 
            popUpCoordinates: { lon: clickEvent.lngLat.lng, lat: clickEvent.lngLat.lat},
            showPopUp: true,
            popUpText: filtered[0][3],
        });
    }

    render() {
        const { 
            renderHeatMapForAll, 
            renderHeatMapFrom, 
            renderHeatMapTo, 
            renderBaseMap,
            pointData,
            lineData,
            data,
            app,
        } = this.props;
        const { popUpCoordinates, showPopUp, popUpText } = this.state;
        return (
            <Container fluid className="p-0 bg-light">
                <Map
                    style="mapbox://styles/mapbox/streets-v9"
                    zoom={[13]}
                    center={[18.5462847, 50.1021742,]}
                    containerStyle={{
                        height: window.innerHeight,
                        width: window.innerWidth,
                    }}>
                    {/* {renderBaseMap && lineData && <LineLayer data={lineData} />} */}
                    {renderHeatMapFrom && data && <LineLayer data={data} />}
                    {renderBaseMap && <PointLayer data={pointData} onClickUpdate={this.onClickUpdate} />}
                    {renderBaseMap && lineData && <HeatmapLayer data={parseLinesToPoints(lineData)} />}
                    {/* {renderHeatMapFrom && <HeatmapLayer data={data} />}
                    {renderHeatMapTo && <HeatmapLayer data={data} />} */}
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
                </Map>;
            </Container>
        );
    }
}

const mapStateToProps = state => state;
const dispatchToProps = { updateCoordinates }

export default connect(mapStateToProps, dispatchToProps)(CustomMap);