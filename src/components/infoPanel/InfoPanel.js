import React, { Component } from "react";
import InfoPanelContent from "./InfoPanelContent";
import { ScrollView } from "@cantonjs/react-scroll-view";

class InfoPanel extends Component {
	state = {
		isOpen: false,
	};

	handleViewChange = () => this.setState({ isOpen: !this.state.isOpen });

	render() {
		const { isOpen } = this.state;
		const styleStatus = isOpen ? "-open" : "-closed";
		return (
			<div className={"infoPanel" + styleStatus}>
				<button onClick={this.handleViewChange} className="infoPanel-toggle">
					{isOpen ? ">" : "<"}
				</button>
				<ScrollView style={{ height: "100vh" }}>
					<div className={"infoPanelContent" + styleStatus}>
						<InfoPanelContent />
					</div>
				</ScrollView>
			</div>
		);
	}
}

export default InfoPanel;
