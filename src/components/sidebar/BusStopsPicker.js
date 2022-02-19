import React, { Component } from "react";
import { connect } from "react-redux";
import { updateStartStopsType, updateEndStopsType } from "../../redux/actions";
import { StopsType } from "../../redux/actionTypes";

const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};

class BusStopsCheckBoxes extends Component {
  state = {
    pickOneValue: false,
    pickAreaValue: false,
    pickAllValue: true,
  };

  handleChange = () => {
    const { pickOneValue, pickAreaValue } = this.state;
    const { isStart, updateStartStopsType, updateEndStopsType } = this.props;
    const update = isStart ? updateStartStopsType : updateEndStopsType;

    if (pickOneValue) {
      update(StopsType.one);
    } else if (pickAreaValue) {
      update(StopsType.area);
    } else {
      update(StopsType.all);
    }
  };

  handleChangeOne = () => {
    this.setState(
      {
        pickOneValue: true,
        pickAllValue: false,
        pickAreaValue: false,
      },
      this.handleChange
    );
  };

  handleChangeArea = () => {
    this.setState(
      {
        pickOneValue: false,
        pickAllValue: false,
        pickAreaValue: true,
      },
      this.handleChange
    );
  };

  handleChangeAll = () => {
    this.setState(
      {
        pickOneValue: false,
        pickAllValue: true,
        pickAreaValue: false,
      },
      this.handleChange
    );
  };

  render() {
    const { pickOneValue, pickAreaValue, pickAllValue } = this.state;
    return (
      <React.Fragment>
        <div className="checkBoxContainer">
          <Checkbox
            label="  Pojedynczy przystanek"
            value={pickOneValue}
            onChange={this.handleChangeOne}
          />
        </div>
        <div className="checkBoxContainer">
          <Checkbox
            label="  Obszar"
            value={pickAreaValue}
            onChange={this.handleChangeArea}
          />
        </div>
        <div className="checkBoxContainer">
          <Checkbox
            label="  Wszystkie przystanki"
            value={pickAllValue}
            onChange={this.handleChangeAll}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => state;
const dispatchToProps = { updateStartStopsType, updateEndStopsType };

export default connect(mapStateToProps, dispatchToProps)(BusStopsCheckBoxes);
