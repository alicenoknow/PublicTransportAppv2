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
                5,
                'rgb(222, 96, 7)',
                20,
                'rgb(222, 7, 7)' ],
                'circle-opacity': 0.7,
                'circle-radius': ["interpolate", ["linear"], ['get', 'commuters'], 1, 5, 10, 25, ],
            }}
    />)}
    
}

export default HeatmapLayer;