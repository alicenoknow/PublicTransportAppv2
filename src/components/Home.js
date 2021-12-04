import React from "react";
import { Component } from "react";
import { connect } from 'react-redux';
import { addDataToMap } from 'kepler.gl/actions';
import { Container } from "react-bootstrap";
import { processGeojson } from 'kepler.gl/processors';
import { updateMap } from 'kepler.gl/actions';
import KeplerMap from "./KeplerMap";
import { pointLayerConfig } from "../keplerConfig/pointLayerConfig";
import { mapStyleConfig } from "../keplerConfig/mapStyleConfig";
import { interactionConfig } from "../keplerConfig/interactionConfig";
import { clusterLayerConfig } from "../keplerConfig/clusterLayerConfig";
import { heatMapLayerConfig } from "../keplerConfig/heatMapLayerConfig";
import SidePanel from "./sidebar/SidePanel";
import NavPadding from "../styled/NavPadding";



class Home extends Component {
    constructor(props) {
        super(props);

        const layerConfigList = this.props.layerConfigs ?? [pointLayerConfig, clusterLayerConfig, heatMapLayerConfig]
        const mapStyle = this.props.mapStyle ?? mapStyleConfig;
        const interactionConf = this.props.interactionConf ?? interactionConfig;

        this.state = {
            displayDownButton: false,
            displayUpButton: false,
            scrollPosition: 0,
            data: [],
            layerConfigList: layerConfigList,
            mapStyle: mapStyle,
            interactionConf: interactionConf,
            isLoading: false
        }

    }

    loadDataOnMap = (data) => {
        const config = {
            datasets: {
                info: {
                    label: 'Rybnik',
                    id: 'public_transport_data'
                },
                data: { fields: [{"name": "buses", "format": "", "type": "integer"}, 
                {"name": "lat", "format": "", "type": "real"}, 
                {"name": "lon", "format": "", "type": "real"}], 
                "rows": [
                    [12, 50.055499567084, 18.5638648996832456], 
                    [4, 50.053599567084, 18.5538648996838036], 
                    [60, 50.054199567084, 18.54386489968386],
                    [20, 50.056499567084, 18.52386489968388], 
                    [11, 50.052499567084, 18.5138648996834], 
                    [60, 50.054499567084, 18.503864899683]]}
            },
            option: {
                centerMap: true,
                readOnly: true,
            },
            config: {
                interactionConfig: this.state.interactionConfig,
                mapStyle: this.state.mapStyle,
                visState: {
                    filters: [],
                    layerBlending: "normal",
                    layers: [clusterLayerConfig]
                }
            }
        }

        this.props.dispatch(addDataToMap(config));
    }

    componentDidMount() {
        // this.props.dispatch(
        //     updateMap({latitude: 50.0944995670842, longitude: 18.543864899683406, zoom: 13})
        // );
        // fetch('/covid_data.json')
        //     .then(response => response.json())
        //     .then((jsonData) => {
        //         this.setState({
        //             data: jsonData,
        //             isLoading: false
        //         });
                this.loadDataOnMap([]);
        //     })
        //     .catch((error) => {
        //         console.error("Unabled to fetch json")
        //     })
    }

    render() {
        return (
            <Container fluid className="p-0 bg-dark" >
                <NavPadding />
                    <SidePanel />
                    <KeplerMap isLoading={this.state.isLoading} />
            </Container >

        );
    }

}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(Home);
