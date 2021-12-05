import React, { Component } from 'react';
import { GeoJSONLayer } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


class PointLayer extends Component {   
    render() {
        const { data, onClickUpdate }= this.props;
        return (
            <GeoJSONLayer
                data={data}
                circleLayout={{ visibility: 'visible' }}
                circlePaint={{
                    'circle-color': '#2647ff',
                    'circle-opacity': 0.8,
                    'circle-radius': 4,
                }}
                circleOnClick={onClickUpdate}
            />
        );
    }
}

export default PointLayer;