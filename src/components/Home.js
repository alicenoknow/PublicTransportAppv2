import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import CustomMap from "../map/CustomMap";
import Loading from "./Loading";
import SidePanel from "./sidebar/SidePanel";
import NavPadding from "../styled/NavPadding";
import { fetchBusStops, fetchAreas } from "../services/api.service";
import { data as areas } from "../dzielnice.json";
import {
	setAreasData,
	setBusStopsData,
	setServerQueryData,
	setLoading,
} from "../redux/actions";
import InfoPanel from "./infoPanel/InfoPanel";

class Home extends Component {
	componentDidMount() {
		const { setLoading: setLoadingState } = this.props;
		setLoadingState(true);
		this.requestStops();
		this.requestAreas();
	}

	async requestStops() {
		const {
			setBusStopsData: setBusStopsState,
			app: areasData,
			setLoading: setLoadingState,
		} = this.props;
		const result = await fetchBusStops();
		if (result) {
			setBusStopsState(result);
			if (areasData) {
				setLoadingState(false);
			}
		}
	}

	async requestAreas() {
		const {
			setAreasData: setAreasState,
			app: { busStopsData },
			setLoading: setLoadingState,
		} = this.props;
		const result = await fetchAreas();
		if (result) {
			// setAreasState(result?.features); TODO
			setAreasState(areas);
			console.warn(areas)
			if (busStopsData) {
				setLoadingState(false);
			}
		}
	}

	render() {
		const { isLoading } = this.props.app;

		if (isLoading) {
			return <Loading />;
		}
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
	setLoading,
};

export default connect(mapStateToProps, dispatchToProps)(Home);
