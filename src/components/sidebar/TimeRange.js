import React, { Component } from "react";
import TimeRange from "react-timeline-range-slider";
import { format } from "date-fns";
import { selectedInterval } from './utils/dateFormatUtils'

class TimelineRange extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: false,
            selectedInterval: selectedInterval,
        };
        this.onChangeCallback(selectedInterval);
    }    

    onChangeCallback = (selectedInterval) => {
        const { onStartTimeChange, onEndTimeChange } = this.props;
        onStartTimeChange(format(selectedInterval[0], "HH:mm"));
        onEndTimeChange(format(selectedInterval[1], "HH:mm"));
        this.setState({ selectedInterval });
    };

    errorHandler = ({ error }) => this.setState({ error });

    render() {
        const { error, selectedInterval } = this.state;
        return (
            <div>
                <div className="timeRangeContainer">
                <p className="selectedHours">{format(selectedInterval[0], "HH:mm")} - {format(selectedInterval[1], "HH:mm")}</p>
                <TimeRange
                    error={error}
                    ticksNumber={13}
                    selectedInterval={selectedInterval}
                    onUpdateCallback={this.errorHandler}
                    onChangeCallback={this.onChangeCallback}
                    containerClassName={"timeRangeContainer"}
                    mode={1}
                />
                </div>
            </div>
        );
    }
}

export default TimelineRange;