import React, { Component } from 'react';
import { GeoJSONLayer } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


class HeatmapLayer extends Component {
    render() {
        const { data } = this.props;
        return (
        <GeoJSONLayer
            data={data}
            circleLayout={{ visibility: 'visible' }}
            circlePaint={{
                'circle-color': ["interpolate", ["linear"], ['get', 'commuters'], 
                0,
                'rgba(255, 236, 143,0)',
                8,
                'rgb(222, 96, 7)',
                12,
                'rgb(222, 7, 7)' ],
                'circle-opacity': 0.7,
                'circle-radius': ["interpolate", ["linear"], ['get', 'commuters'], 1, 30, 10, 80, ],
            }}
    />)}
    
}

export default HeatmapLayer;