import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import DrawControl from 'react-mapbox-gl-draw';
import { connect } from 'react-redux';
import PointLayer from './PointLayer';
import HeatmapLayer from './HeatmapLayer';
import ReactMapboxGl, { Source } from 'react-mapbox-gl';
import { StopsType } from '../redux/actionTypes';
import { updateCoordinates } from '../redux/actions';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWxpY2Vub2tub3ciLCJhIjoiY2txNDI3OXBnMGE2MDJwbXBvNXNic2N5eCJ9.JBfBgMVAkOOpQF7FMrpKSw';


const Map = ReactMapboxGl({
    accessToken:
    MAPBOX_TOKEN
  });

class CustomMap extends Component {   
    onDrawUpdate = ({ features }) => {
        this.props.updateCoordinates(features[0].geometry.coordinates);
    };


    render() {
        const { 
            renderHeatMapForAll, 
            renderHeatMapFrom, 
            renderHeatMapTo, 
            renderBaseMap,
            data,
            app, 
        } = this.props;

        return (
            <Container fluid className="p-0 bg-light">
                <Map
                    style="mapbox://styles/mapbox/streets-v9"
                    zoom={[12]}
                    center={[18.5462847, 50.1021742,]}
                    containerStyle={{
                        height: window.innerHeight,
                        width: window.innerWidth,
                    }}>
                    
                {renderBaseMap && <PointLayer data={data} />}
                    {renderHeatMapForAll && <HeatmapLayer data={data} />}
                    {renderHeatMapFrom && <HeatmapLayer data={data} />}
                    {renderHeatMapTo && <HeatmapLayer data={data} />}
                    {app.stopsType === StopsType.area && <DrawControl 
                            ref={(drawControl) => { this.drawControl = drawControl; }}
                            defaultMode='draw_polygon'
                            displayControlsDefault={false}
                            onDrawCreate={this.onDrawUpdate} onDrawUpdate={this.onDrawUpdate}
                            />}
                </Map>;
            </Container>
        );
    }
}

const mapStateToProps = state => state;
const dispatchToProps = { updateCoordinates }

export default connect(mapStateToProps, dispatchToProps)(CustomMap);