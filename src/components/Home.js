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
import InfoPanel from "./InfoPanel";

class Home extends Component {
	componentDidMount() {
		fetchBusStops(data => setBusStopsData(data));
		fetchAreas(data => setAreasData(data));
	}

	render() {
		const { busStopsData, areasData, serverQueryData } = this.props.app;
		const isLoading = !busStopsData || !areasData;

		// if (isLoading) {
		// 	return <Loading />;
		// }

		return (
			<Container fluid className="p-0 bg-dark">
				<NavPadding />
				<SidePanel
					data={busStopsData}
					setData={this.setServerData}
					setServerWait={this.setServerWait}
				/>
				<InfoPanel />
				<CustomMap
					busStopsData={busStopsData}
					areasData={areasData}
					serverData={serverQueryData}
				/>
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
