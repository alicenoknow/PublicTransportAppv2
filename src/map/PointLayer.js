import React, { Component } from 'react';
import { GeoJSONLayer } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


class PointLayer extends Component {   

    render() {
        const { data }= this.props;
        return (
            <GeoJSONLayer
                data={data}
                circleLayout={{ visibility: 'visible' }}
                circlePaint={{
                    'circle-color': '#00dbaf',
                    'circle-opacity': 0.7,
                    'circle-radius': 10,
                    'circle-stroke-color': '#b0ffef'
                }}
                circleOnClick={(evt) => console.warn(evt)}
            />
        );
    }
}

export default PointLayer;