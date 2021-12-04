import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Loading from '../components/Loading';
import PointLayer from './PointLayer';
import HeatmapLayer from './HeatmapLayer';
import ReactMapboxGl, { Source } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWxpY2Vub2tub3ciLCJhIjoiY2txNDI3OXBnMGE2MDJwbXBvNXNic2N5eCJ9.JBfBgMVAkOOpQF7FMrpKSw';


const Map = ReactMapboxGl({
    accessToken:
    MAPBOX_TOKEN
  });

class CustomMap extends Component {
    render() {
        const { 
            renderHeatMapForAll, 
            renderHeatMapFrom, 
            renderHeatMapTo, 
            renderBaseMap,
            data, 
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
                </Map>;
            </Container>
        );
    }
}

export default CustomMap;