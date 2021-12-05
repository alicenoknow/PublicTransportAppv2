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
                    // [ 
                    //     'match',
                    // ['get', 'commuters'],
                    // 1,
                    // '#fbb03b',
                    // 2,
                    // '#223b53',
                    // 3,
                    // '#e55e5e',
                    // 4,
                    // '#3bb2d0',
                    // /* other */ '#e60058'],
                    'line-opacity': 0.6,
                    'line-width': ["interpolate", ["linear"], ['get', 'commuters'],
                                    1, 1,
                                    10, 15, 
                                ]
                }}
                lineOnClick={onClickUpdate}
            />
        );
    }
}

export default LineLayer;