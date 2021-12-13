import React, { Component } from 'react';
import { GeoJSONLayer } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


class LineLayer extends Component {   
    render() {
        const { data, onClickUpdate }= this.props;
        return (
            <GeoJSONLayer
                data={data}
                lineLayout={{ visibility: 'visible' }}
                linePaint={{
                    'line-color': '#e60058',
                    'line-opacity': 0.6,
                    'line-width': ["interpolate", ["linear"], ['get', 'commuters'],
                                    1, 1,
                                    10, 20, 
                                ]
                }}
                lineOnClick={onClickUpdate}
            />
        );
    }
}

export default LineLayer;