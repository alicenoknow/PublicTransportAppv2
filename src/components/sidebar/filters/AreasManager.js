import React, { Component } from "react";
import { connect } from "react-redux";
import {
	updateStartStopsType,
	updateEndStopsType,
	setDrawMode,
	setAreasData,
} from "../../../redux/actions";
import { ScrollView } from "@cantonjs/react-scroll-view";
import { Spinner, Container, Button } from "react-bootstrap";

class AreasManager extends Component {
	state = {
		areas: null,
		isFetching: true,
	};

	componentDidMount() {
		this.fetchAreas();
	}

	fetchAreas = async () => {
		this.setState({ isFetching: false });
	};

	removeArea = id => {
		const { areasData } = this.props.app;
		delete areasData[id];
		this.props.setAreasData(areasData);
	};

	renderListElement = area => {
		// TODO
		return (
			<div className="areaListElement" key={area.id}>
				<div>{area.properties.NAZWA}</div>
				<div style={{ flex: 1 }} />
				<Button
					className="removeButton"
					type="button"
					size="sm"
					onClick={() => this.removeArea(area.id)}>
					<div className="cross" />
				</Button>
			</div>
		);
	};

	renderAddAreaButton = () => {
		return (
			<div className="addAreaButtonContainer">
				<Button
					className="addAreaButton"
					type="button"
					size="sm"
					onClick={() => this.props.setDrawMode(true)}>
					+ Dodaj nowy obszar
				</Button>
			</div>
		);
	};

	render() {
		const {
			app: { areasData },
		} = this.props;
		const { isFetching } = this.state;
		return (
			<>
				{this.renderAddAreaButton()}
				<ScrollView style={{ height: "300px" }}>
					{!isFetching &&
						Object.values(areasData).map(el => this.renderListElement(el))}
					{isFetching && (
						<Container className="centerContainer">
							<Spinner className="spinner" animation="grow" variant="light" />
						</Container>
					)}
				</ScrollView>
			</>
		);
	}
}

const mapStateToProps = state => state;
const dispatchToProps = {
	updateStartStopsType,
	updateEndStopsType,
	setDrawMode,
	setAreasData,
};

export default connect(mapStateToProps, dispatchToProps)(AreasManager);
