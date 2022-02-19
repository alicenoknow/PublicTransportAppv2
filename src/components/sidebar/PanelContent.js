import React, { Component } from "react";
import Collapsible from "react-collapsible";
import { connect } from "react-redux";
import { updateFilters } from "../../redux/actions";
import {
  fetchFromArea,
  fetchFromList,
  fetchToList,
  fetchToArea,
} from "../../api/apiService";
import DateRange from "./DateRange";
import TimeRange from "./TimeRange";
import WeekDayPicker from "./WeekDayPicker";
import TicketPicker from "./TicketPicker";
import BusStopsPicker from "./BusStopsPicker";
import { StopsType } from "../../redux/actionTypes";

class PanelContent extends Component {
  state = {
    startDate: undefined,
    endDate: undefined,
    startTime: undefined,
    endTime: undefined,
    intervalStartTime: undefined,
    intervalEndTime: undefined,
    weekDays: [],
    ticketType: [],
  };

  onStartTimeChange = (time) =>
    this.setState({ startTime: time }, this.updateFilters);
  onEndTimeChange = (time) =>
    this.setState({ endTime: time }, this.updateFilters);
  onIntervalStartTimeChange = (time) =>
    this.setState({ intervalStartTime: time }, this.updateFilters);
  onIntervalEndTimeChange = (time) =>
    this.setState({ intervalEndTime: time }, this.updateFilters);
  onStartDateChange = (date) =>
    this.setState({ startDate: date }, this.updateFilters);
  onEndDateChange = (date) =>
    this.setState({ endDate: date }, this.updateFilters);
  onWeekDaysChange = (weekDays) =>
    this.setState({ weekDays: weekDays }, this.updateFilters);
  onTicketTypeChange = (ticketType) =>
    this.setState({ ticketType: ticketType }, this.updateFilters);
  updateFilters = () => {
    const { startDate, endDate, startTime, endTime, weekDays, ticketType } =
      this.state;
    this.props.updateFilters({
      startDate,
      endDate,
      startTime,
      endTime,
      weekDays,
      ticketType,
    });
  };

  processData = () => {
    const { app, setData, setServerWait } = this.props;
    setServerWait();

    if (app.stopsType === StopsType.one || app.stopsType === StopsType.all) {
      fetchFromList((data) => setData(data), {
        filters: {
          startDate: app.filters.startDate,
          endDate: app.filters.endDate,
          startTime: app.filters.startTime,
          endTime: app.filters.endTime,
          weekDays: app.filters.weekDays,
        },
        busStops:
          app.chosenBusStops.length === 0 ? undefined : [app.chosenBusStops],
      });
    } else {
      fetchFromArea((data) => setData(data), {
        filters: {
          startDate: app.filters.startDate,
          endDate: app.filters.endDate,
          startTime: app.filters.startTime,
          endTime: app.filters.endTime,
          weekDays: app.filters.weekDays,
        },
        corners: app.chosenBusStops[0],
      });
    }

    if (app.stopsType === StopsType.one || app.stopsType === StopsType.all) {
      fetchToList((data) => setData(data), {
        filters: {
          startDate: app.filters.startDate,
          endDate: app.filters.endDate,
          startTime: app.filters.startTime,
          endTime: app.filters.endTime,
          weekDays: app.filters.weekDays,
        },
        busStops:
          app.chosenBusStops.length === 0 ? undefined : [app.chosenBusStops],
      });
    } else {
      fetchToArea((data) => setData(data), {
        filters: {
          startDate: app.filters.startDate,
          endDate: app.filters.endDate,
          startTime: app.filters.startTime,
          endTime: app.filters.endTime,
          weekDays: app.filters.weekDays,
        },
        corners: app.chosenBusStops[0],
      });
    }
  };

  getFiltersSelection = () => {
    return (
      <Collapsible trigger="Filtry">
        <Collapsible className={"NestedCollapsible"} trigger="Wybierz godziny">
          <TimeRange
            onStartTimeChange={this.onStartTimeChange}
            onEndTimeChange={this.onEndTimeChange}
            onIntervalStartTimeChange={this.onIntervalStartTimeChange}
            onIntervalEndTimeChange={this.onIntervalEndTimeChange}
          />
        </Collapsible>
        <Collapsible
          className={"NestedCollapsible"}
          trigger="Wybierz zakres dat"
        >
          <DateRange
            onStartDateChange={this.onStartDateChange}
            onEndDateChange={this.onEndDateChange}
          />
        </Collapsible>
        <Collapsible
          className={"NestedCollapsible"}
          trigger="Wybierz dzień tygodnia"
        >
          <WeekDayPicker onWeekDaysChange={this.onWeekDaysChange} />
        </Collapsible>
        <Collapsible
          className={"NestedCollapsible"}
          trigger="Wybierz rodzaj biletów"
        >
          <TicketPicker onTicketTypeChange={this.onTicketTypeChange} />
        </Collapsible>
      </Collapsible>
    );
  };

  getVisualizationSelection = () => {
    return (
      <Collapsible trigger="Rodzaje wizualizacji">
        <Collapsible
          className={"NestedCollapsible"}
          trigger="Wybierz początek trasy"
        >
          <BusStopsPicker isStart={false} />
        </Collapsible>
        <Collapsible
          className={"NestedCollapsible"}
          trigger="Wybierz koniec trasy"
        >
          <BusStopsPicker />
        </Collapsible>
      </Collapsible>
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.getFiltersSelection()}
        {this.getVisualizationSelection()}
        <button onClick={this.processData} className="confirmButton">
          Przetwarzaj dane
        </button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => state;
const dispatchToProps = { updateFilters };

export default connect(mapStateToProps, dispatchToProps)(PanelContent);
