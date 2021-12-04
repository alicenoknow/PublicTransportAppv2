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
            citiesData: [],
            busStopsData: [],
            districtsData: [],
            isLoading: true,
        }
    }

    finishLoading = () => this.setState({ isLoading: false });

    successHandler = (newData) => {
        this.setState({ busStopsData: newData, isLoading: false }, () => this.loadDataOnMap([newData]));
    }

    componentDidMount() {
        fetchBusStops(this.successHandler);
    }

    render() {
        return (
            <Container fluid className="p-0 bg-dark" >
                <NavPadding />
                    <SidePanel />
                    <CustomMap isLoading={this.state.isLoading} />
            </Container >
        );
    }

}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(Home);
