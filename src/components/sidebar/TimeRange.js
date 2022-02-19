import React, { Component } from "react";
import moment from "moment";
import NumberPicker from "react-widgets/NumberPicker";
import TimeInput from "react-widgets/TimeInput";
import "react-widgets/styles.css";

class TimelineRange extends Component {
  state = {
    to: undefined,
    from: undefined,
    intervalTo: undefined,
    intervalFrom: undefined,
  };

  onChangeFromCallback = (fromTime) => {
    const { onStartTimeChange } = this.props;
    onStartTimeChange(fromTime);
    this.setState({ from: fromTime });
  };

  onChangeToCallback = (toTime) => {
    const { onEndTimeChange } = this.props;
    onEndTimeChange(toTime);
    this.setState({ to: toTime });
  };

  onChangeIntervalFromCallback = (fromTime) => {
    const { onIntervalStartTimeChange } = this.props;
    onIntervalStartTimeChange(fromTime);
    this.setState({ intervalFrom: fromTime });
  };

  onChangeIntervalToCallback = (toTime) => {
    const { onIntervalEndTimeChange } = this.props;
    onIntervalEndTimeChange(toTime);
    this.setState({ intervalTo: toTime });
  };

  getIntervalUpperBound = (isUpper) => {
    const { from, intervalTo } = this.state;
    if (from !== undefined) {
      if (intervalTo !== undefined && !isUpper) {
        return Math.min(24 - moment(from).hours(), intervalTo);
      }
      return 24 - moment(from).hours();
    }
    return 24;
  };

  getIntervalLowerBound = (isUpper) => {
    const { intervalFrom } = this.state;
    if (isUpper && intervalFrom !== undefined) {
      return Math.max(0, intervalFrom);
    }
    return 0;
  };

  render() {
    const { from, to, intervalFrom, intervalTo } = this.state;
    return (
      <div className="timers">
        <p>
          {`${
            from !== undefined && to !== undefined
              ? `Odjazd między ${moment(from).format("HH:mm")} - ${moment(
                  to
                ).format("HH:mm")}`
              : ""
          }`}
        </p>
        <p>
          {`${
            intervalFrom !== undefined && intervalTo !== undefined
              ? `Powrót po ${intervalFrom} - ${intervalTo} godzinach`
              : ""
          }`}
        </p>
        <div className="timeRow">
          <p>Wybierz godzinę początkową: </p>
          <TimeInput onChange={this.onChangeFromCallback} defaultValue={from} />
        </div>
        <div className="timeRow">
          <p>Wybierz godzinę końcową: </p>
          <TimeInput onChange={this.onChangeToCallback} defaultValue={to} />
        </div>
        <div className="timeRow">
          <p>Wybierz początek interwału: </p>
          <NumberPicker
            defaultValue={intervalFrom}
            step={0.5}
            onChange={this.onChangeIntervalFromCallback}
            min={this.getIntervalLowerBound()}
            max={this.getIntervalUpperBound()}
          />
        </div>
        <div className="timeRow">
          <p>Wybierz koniec interwału: </p>
          <NumberPicker
            defaultValue={intervalTo}
            step={0.5}
            onChange={this.onChangeIntervalToCallback}
            min={this.getIntervalLowerBound(true)}
            max={this.getIntervalUpperBound(true)}
          />
        </div>
      </div>
    );
  }
}

export default TimelineRange;
