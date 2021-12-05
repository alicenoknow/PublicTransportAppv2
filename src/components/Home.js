import React from "react";
import { Component } from "react";
import { connect } from 'react-redux';
import { Container } from "react-bootstrap";
import CustomMap from "../map/CustomMap";

import SidePanel from "./sidebar/SidePanel";
import NavPadding from "../styled/NavPadding";
import { fetchBusStops, fetchFrom } from '../api/apiService';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            serverData: [],
            busStopsData: [],
            linesData: [],
            renderBaseMap: false,
            isLoading: true,
            renderServerMap: false,
        }
    }

    setServerData = (data) => {
        this.setState({ serverData: data }, 
            () => this.setState({ renderServerMap: true }));
    }

    setServerWait = () => {
        this.setState({ renderServerMap: false });
    }

    successHandler = (newData) => {
        this.setState({ busStopsData: newData, isLoading: false }, 
            () => this.setState({ renderBaseMap: true }));
    }

    successHandler = (newData) => {
        this.setState({ busStopsData: newData, isLoading: false }, 
            () => this.setState({ renderBaseMap: true }));
    }

    componentDidMount() {
        fetchFrom(data => this.setState({ linesData: data}), { filters: {}});
        fetchBusStops(this.successHandler);
    }

    render() {
        const { renderBaseMap, busStopsData, linesData, serverData, isLoading, renderServerMap } = this.state;
        return (
            <Container fluid className="p-0 bg-dark" >
                <NavPadding />
                    <SidePanel data={busStopsData} setData={this.setServerData} setServerWait={this.setServerWait} />
                    <CustomMap 
                        isLoading={isLoading}
                        renderBaseMap={renderBaseMap}
                        data={serverData}
                        pointData={busStopsData}
                        lineData={linesData}
                        renderHeatMapFrom={renderServerMap}
                    />
            </Container >
        );
    }

}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(Home);
