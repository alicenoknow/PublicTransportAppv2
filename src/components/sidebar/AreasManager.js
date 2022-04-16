import React, { Component } from "react";
import { connect } from "react-redux";
import { updateStartStopsType, updateEndStopsType } from "../../redux/actions";
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
		this.setState({ areas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 12, 123, 124, 345] });
		this.setState({ isFetching: false });
	};

	removeArea = () => {
		// this.setState({ isFetching: true });
		// this.setState({ isFetching: false });
	};

	renderListElement = area => {
		return (
			<div className="areaListElement">
				<div>Area</div>
				<div style={{ flex: 1 }} />
				<Button
					className="removeButton"
					type="button"
					size="sm"
					onClick={this.removeArea}>
					Usuń
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
					onClick={this.removeArea}>
					+ Dodaj nowy obszar
				</Button>
			</div>
		);
	};

	render() {
		const { areas, isFetching } = this.state;
		return (
			<>
				{this.renderAddAreaButton()}
				<ScrollView style={{ height: "300px" }}>
					{!isFetching && areas.map(el => this.renderListElement(el))}
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
const dispatchToProps = { updateStartStopsType, updateEndStopsType };

export default connect(mapStateToProps, dispatchToProps)(AreasManager);
