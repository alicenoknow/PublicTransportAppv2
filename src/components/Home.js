import React from "react";
import { Component } from "react";
import { connect } from 'react-redux';
import { Container } from "react-bootstrap";
import CustomMap from "../map/CustomMap";

import SidePanel from "./sidebar/SidePanel";
import NavPadding from "../styled/NavPadding";
import { fetchBusStops, fetchCities, fetchDistricts } from '../api/apiService';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            busStopsData: [],
            renderBaseMap: false,
            isLoading: true,
        }
    }

    finishLoading = () => this.setState({ isLoading: false });

    successHandler = (newData) => {
        this.setState({ busStopsData: newData, isLoading: false }, 
            () => this.setState({ renderBaseMap: true }));
        console.warn(newData)
    }

    componentDidMount() {
        fetchBusStops(this.successHandler);
    }

    render() {
        const { renderBaseMap, busStopsData, isLoading } = this.state;
        return (
            <Container fluid className="p-0 bg-dark" >
                <NavPadding />
                    <SidePanel />
                    <CustomMap 
                        isLoading={isLoading}
                        renderBaseMap={renderBaseMap}
                        data={busStopsData}
                    />
            </Container >
        );
    }

}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(Home);
