import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import CustomMap from "../map/CustomMap";
import Loading from "./Loading";
import SidePanel from "./sidebar/SidePanel";
import NavPadding from "../styled/NavPadding";
import { fetchBusStops, fetchAreas } from "../services/api.service";
import {
	setAreasData,
	setBusStopsData,
	setServerQueryData,
	setLoading,
} from "../redux/actions";
import InfoPanel from "./infoPanel/InfoPanel";

class Home extends Component {
	state = {
		unauthorized: false
	}

	componentDidMount() {
		const { setLoading: setLoadingState } = this.props;
		setLoadingState(true);
		this.requestStops();
		this.requestAreas();
	}

	async requestStops() {
		const {
			setBusStopsData: setBusStopsState,
			setLoading: setLoadingState,
		} = this.props;
		const result = await fetchBusStops();

		if (result?.data) {
			setBusStopsState(result.data);
		}  else if (result === 401) {
			this.setState({unauthorized: true})
		}

		const areasData = this.props.app.areasData;
		if (areasData && areasData.length > 0) {
			setLoadingState(false);
		}
	}

	async requestAreas() {
		const {
			setAreasData: setAreasState,
			setLoading: setLoadingState,
		} = this.props;
		const result = await fetchAreas();
		if (result?.data) {
			setAreasState(result.data?.features);
		}  else if (result === 401) {
			this.setState({ unauthorized: true })
		}

		if (this.props.app.busStopsData) {
			setLoadingState(false);
		} 
	}

	componentWillUnmount() {
		this.setState = () => {
			return;
		};
	}

	render() {
		const { isLoading } = this.props.app;

		if (this.state.unauthorized) {
			return <Navigate to="/" replace={true} />
		}
		return (
			<Container fluid className="p-0 bg-dark">
				<NavPadding />
				<SidePanel />
				<InfoPanel />
				<CustomMap />
				{isLoading && <Loading />}
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
