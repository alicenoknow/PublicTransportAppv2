import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Loading from '../components/Loading';

import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWxpY2Vub2tub3ciLCJhIjoiY2txNDI3OXBnMGE2MDJwbXBvNXNic2N5eCJ9.JBfBgMVAkOOpQF7FMrpKSw';


const Map = ReactMapboxGl({
    accessToken:
    MAPBOX_TOKEN
  });

class CustomMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
          viewport: {
            latitude: 50.1021742,
            longitude: 18.5462847,
            zoom: 12,
            bearing: 0,
            pitch: 0,
            dragPan: true,
          }
        };
        // this.mapContainer = React.createRef();
    }

    componentDidMount() {
        // const map = this.reactMap.getMap();
        //     map.on('load', () => {
        //     //add the GeoJSON layer here
        //     map.addLayer({...})
        // })
        // this.map = new mapboxgl.Map({
        //   container: this.mapContainer.current,
        //   style: 'mapbox://styles/mapbox/streets-v11',
        //   center: [lng, lat],
        //   zoom: zoom
        // });
    }

    addLayer = () => {

    }

    render() {
        const { renderHeatMapForAll, renderHeatMapFrom, renderHeatMapTo } = this.props;
        return (
            <Container fluid className="p-0 bg-light">
                {this.props.isLoading && <Loading />} 
                <Map
                    style="mapbox://styles/mapbox/streets-v9"
                    zoom={[12]}
                    center={[18.5462847, 50.1021742,]}
                    containerStyle={{
                        height: window.innerHeight,
                        width: window.innerWidth,
                    }}>
                    {/* {renderHeatMapForAll && <HeatmapLayer />}
                    {renderHeatMapFrom && <HeatmapLayer />}
                    {renderHeatMapTo && <HeatmapLayer />} */}
                </Map>;
            </Container>
        );
    }
}

export default CustomMap;