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
                    'circle-color': '#00dbaf',
                    'circle-opacity': 0.6,
                    'circle-radius': 8,
                }}
                circleOnClick={onClickUpdate}
            />
        );
    }
}

export default PointLayer;