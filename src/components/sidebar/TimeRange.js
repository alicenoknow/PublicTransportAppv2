import React, { Component } from "react";
import TimeSlider from './TimeSlider';

class TimelineRange extends Component {
    state = {
        selectedInterval: ["10:00", "12:00"],
    };

    componentDidMount() {
        this.onChangeCallback(["10:00", "12:00"]);
    }
   
    onChangeCallback = (selectedInterval) => {
        const { onStartTimeChange, onEndTimeChange } = this.props;
        onStartTimeChange(selectedInterval[0]);
        onEndTimeChange(selectedInterval[1]);
        this.setState({ selectedInterval });
    };


    render() {
        const {selectedInterval } = this.state;
        return (
            <div>
                <div className="timeRangeContainer">
                <p className="selectedHours">{selectedInterval[0]} - {selectedInterval[1]}</p>
                <TimeSlider onChangeCallback={this.onChangeCallback} />
                </div>
            </div>
        );
    }
}

export default TimelineRange;