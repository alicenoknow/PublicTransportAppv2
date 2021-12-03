import React, { Component } from 'react';
import KeplerGl from 'kepler.gl';
import { Container } from 'react-bootstrap';
import Loading from './Loading';

class KeplerMap extends Component {
    render() {
        return (
            <Container fluid className="p-0 bg-dark">
                {this.props.isLoading ? 
                <Loading /> : 
                <KeplerGl
                    id="map"
                    width={window.innerWidth}
                    height={window.innerHeight}
                    mapboxApiAccessToken={"pk.eyJ1IjoiYWxpY2Vub2tub3ciLCJhIjoiY2txNDI3OXBnMGE2MDJwbXBvNXNic2N5eCJ9.JBfBgMVAkOOpQF7FMrpKSw"}
                />}
            </Container>
        );
    }
}

export default KeplerMap;