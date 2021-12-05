import React, { Component } from "react";
import Collapsible from 'react-collapsible';
import { connect } from 'react-redux';
import { updateFilters } from '../../redux/actions';
import DateRange from './DateRange';
import TimeRange from './TimeRange';
import WeekDayPicker from './WeekDayPicker';
import BusStopsCheckBoxes from './BusStopsCheckBoxes';
import DirectionTypeCheckBoxes from './DirectionTypeCheckBoxes';


class PanelContent extends Component {
  state = {
    startDate: undefined,
    endDate: undefined,
    startTime: undefined,
    endTime: undefined,
    weekDays: [],
  }

  onStartTimeChange = (time) => this.setState({ startTime: time }, this.updateFilters);
  onEndTimeChange = (time) => this.setState({ endTime: time }, this.updateFilters);
  onStartDateChange = (date) => this.setState({ startDate: date }, this.updateFilters);
  onEndDateChange = (date) => this.setState({ endDate: date }, this.updateFilters);
  onWeekDaysChange = (weekDays) => this.setState({ weekDays: weekDays}, this.updateFilters);
  updateFilters = () => {
    const { startDate, endDate, startTime, endTime, weekDays } = this.state;
    this.props.updateFilters({ startDate, endDate, startTime, endTime, weekDays });
  }

  processData = () => {

  }

  getFiltersSelection = () => {
    return (
    <Collapsible trigger="Filtruj">
      <Collapsible className={"NestedCollapsible"} trigger="Wybierz godziny">
        <TimeRange onStartTimeChange={this.onStartTimeChange} onEndTimeChange={this.onEndTimeChange} />
      </Collapsible>
      <Collapsible className={"NestedCollapsible"} trigger="Wybierz zakres dat">
        <DateRange onStartDateChange={this.onStartDateChange} onEndDateChange={this.onEndDateChange}/>
      </Collapsible>
      <Collapsible className={"NestedCollapsible"} trigger="Wybierz dzień tygodnia">
        <WeekDayPicker onWeekDaysChange={this.onWeekDaysChange} />
      </Collapsible>
    </Collapsible>);
  }

  getVisualizationSelection = () => {
    return (
      <Collapsible trigger="Wizualizuj">
        <Collapsible className={"NestedCollapsible"} trigger="Wybierz przystanki:">
          <BusStopsCheckBoxes/>
        </Collapsible>
      <Collapsible className={"NestedCollapsible"} trigger="Wybierz rodzaj wizualizacji:">
          <DirectionTypeCheckBoxes/>
      </Collapsible>
      </Collapsible>
    );
  } 

  render() {
    return (
        <React.Fragment>
            {this.getFiltersSelection()}
            {this.getVisualizationSelection()}
            <button onClick={this.processData} className="confirmButton">Przetwarzaj dane</button>
        </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({ filters: state.app.filters })
const dispatchToProps = { updateFilters };

export default connect(mapStateToProps, dispatchToProps)(PanelContent);