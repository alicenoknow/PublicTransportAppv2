import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import CustomMap from "../map/CustomMap";
import Loading from "./Loading";
import SidePanel from "./sidebar/SidePanel";
import NavPadding from "../styled/NavPadding";
import { fetchBusStops, fetchAreas } from "../services/api.service";
import {
	setAreasData,
	setBusStopsData,
	setServerQueryData,
} from "../redux/actions";
import InfoPanel from "./infoPanel/InfoPanel";

class Home extends Component {
	componentDidMount() {
		fetchBusStops(data => setBusStopsData(data));
		// fetchAreas(data => setAreasData(data));
	}

	render() {
		const { busStopsData, serverQueryData } = this.props.app;
		const isLoading = !busStopsData;

		// if (isLoading) {
		// 	return <Loading />;
		// }

		return (
			<Container fluid className="p-0 bg-dark">
				<NavPadding />
				<SidePanel />
				<InfoPanel />
				<CustomMap />
			</Container>
		);
	}
}

const mapStateToProps = state => state;
const dispatchToProps = {
	setBusStopsData,
	setAreasData,
	setServerQueryData,
};

export default connect(mapStateToProps, dispatchToProps)(Home);
