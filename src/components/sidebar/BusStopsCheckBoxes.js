import React, { Component } from "react";
import { connect } from 'react-redux';
import { updateStopsType } from '../../redux/actions';
import { StopsType } from '../../redux/actionTypes'

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
        markAreaValue: false,
    }

    handleChange = () => {
        const { pickOneValue, markAreaValue } = this.state;
        const { updateStopsType } = this.props; 
        if (pickOneValue) {
            updateStopsType(StopsType.one);
        } else if (markAreaValue) {
            updateStopsType(StopsType.area);
        } else {
            updateStopsType(StopsType.all);
        }
    }

    handleChangeOne = () => {
        const { pickOneValue, markAreaValue } = this.state;
        const isMarked = !pickOneValue;
        this.setState({ pickOneValue: isMarked, markAreaValue: isMarked ? false : markAreaValue }, this.handleChange);
    }

    handleChangeArea = () => {
        const { pickOneValue, markAreaValue } = this.state;
        const isMarked = !markAreaValue;
        this.setState({ pickOneValue: isMarked ? false : pickOneValue, markAreaValue: isMarked }, this.handleChange);
    }

    render() {
        const { pickOneValue, markAreaValue } = this.state;
        return (
            <React.Fragment>
                <div className="checkBoxContainer">
                    <Checkbox
                        label="  Wybierz pojedynczy przystanek"
                        value={pickOneValue}
                        onChange={this.handleChangeOne}
                    />
                </div>
                <div className="checkBoxContainer">
                    <Checkbox
                        label="  Zaznacz obszar"
                        value={markAreaValue}
                        onChange={this.handleChangeArea}
                    />
                </div>
            </React.Fragment>
    );
  }
}

const mapStateToProps = state => state;
const dispatchToProps = { updateStopsType };

export default connect(mapStateToProps, dispatchToProps)(BusStopsCheckBoxes);