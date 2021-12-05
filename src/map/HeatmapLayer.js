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
                'circle-color': '#00dbaf',
                'circle-opacity': 0.6,
                'circle-radius': 8,
            }}
    />)}
    
}

export default HeatmapLayer;