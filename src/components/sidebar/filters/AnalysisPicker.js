import React, { Component } from "react";
import { connect } from "react-redux";
import { AnalysisType } from "../../../redux/actionTypes";
import { setAnalysisType } from "../../../redux/actions";

const CheckBox = props => {
	return (
		<p>
			<input
				key={props.id}
				onChange={props.handleCheckElement}
				onClick={props.handleCheckElement}
				type="checkbox"
				checked={props.isChecked}
				value={props.value}
			/>{" "}
			{props.value}
		</p>
	);
};

class AnalysisPicker extends Component {
	state = {
		oneWay: { id: 0, value: "Analiza jednokierunkowa", isChecked: true },
		twoWay: { id: 1, value: "Analiza wahadłowa", isChecked: false },
	};

	handleCheck = event => {
		const { oneWay, twoWay } = this.state;
		if (event.target.value === oneWay.value) {
			this.setState(
				{
					oneWay: {
						...oneWay,
						isChecked: !oneWay.isChecked,
					},
					twoWay: {
						...twoWay,
						isChecked: oneWay.isChecked,
					},
				},
				() =>  
					this.props.setAnalysisType(
						this.state.oneWay.isChecked ? AnalysisType.oneWay : AnalysisType.twoWay,
					),
			);
		} else {
			this.setState(
				{
					oneWay: {
						...oneWay,
						isChecked: twoWay.isChecked,
					},
					twoWay: {
						...twoWay,
						isChecked: !twoWay.isChecked,
					},
				},
				() => 
					this.props.setAnalysisType(
						this.state.oneWay.isChecked ? AnalysisType.oneWay : AnalysisType.twoWay,
					) 				
			);
		}
	};

	render() {
		const { oneWay, twoWay } = this.state;
		return (
			<div className="pickerContainer">
				<CheckBox
					key={oneWay.id}
					handleCheckElement={this.handleCheck}
					value={oneWay.value}
					isChecked={oneWay.isChecked}
				/>
				<CheckBox
					key={twoWay.id}
					handleCheckElement={this.handleCheck}
					value={twoWay.value}
					isChecked={twoWay.isChecked}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => state;
const dispatchToProps = { setAnalysisType };

export default connect(mapStateToProps, dispatchToProps)(AnalysisPicker);
