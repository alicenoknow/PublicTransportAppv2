import React, { Component } from "react";
import { connect } from 'react-redux';
import { updateDirectionType } from '../../redux/actions';
import { DirectionType } from '../../redux/actionTypes'

const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
};

class DirectionTypeCheckBoxes extends Component {
    state = {
        fromValue: true,
        toValue: false,
    }

    handleChange = () => {
        const { fromValue } = this.state;
        const { updateDirectionType } = this.props; 

        if (fromValue) {
            updateDirectionType(DirectionType.from);
        } else {
            updateDirectionType(DirectionType.to);
        }
    }

    handleFrom = () => {
        const { fromValue } = this.state;
        const isMarked = !fromValue;
        this.setState({ fromValue: isMarked, toValue: isMarked ? false : true }, this.handleChange);
    }

    handleTo = () => {
        const { toValue } = this.state;
        const isMarked = !toValue;
        this.setState({ fromValue: isMarked ? false : true, toValue: isMarked }, this.handleChange);
    }

    render() {
        const { fromValue, toValue } = this.state;
        return (
            <React.Fragment>
                <div className="checkBoxContainer">
                    <Checkbox
                        label="  Ruch z tego przystanku"
                        value={fromValue}
                        onChange={this.handleFrom}
                    />
                </div>
                <div className="checkBoxContainer">
                    <Checkbox
                        label="  Ruch do tego przystanku"
                        value={toValue}
                        onChange={this.handleTo}
                    />
                </div>
            </React.Fragment>
    );
  }
}

const mapStateToProps = state => state;
const dispatchToProps = { updateDirectionType };

export default connect(mapStateToProps, dispatchToProps)(DirectionTypeCheckBoxes);