import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DateRange extends Component {
    state = {
        startDate: undefined,
        endDate: undefined,
    };

    setStartDate = (date) => { 
        this.setState({ startDate: date });
        this.props.onStartDateChange(date);
    }

    setEndDate = (date) => { 
        this.setState({ endDate: date });
        this.props.onEndDateChange(date);
    }

    renderDatePicker = (value, handler, title) => {
        return (
            <div className="datePicker">
                <p>{title}</p>
                <DatePicker selected={value} onChange={handler} />
            </div>
        );
    }

    render() {
        const { startDate, endDate } = this.state;
        return (
            <React.Fragment>
                {this.renderDatePicker(startDate, this.setStartDate, "Wybierz datę początkową:")}
                {this.renderDatePicker(endDate, this.setEndDate, "Wybierz datę końcową:")}
            </React.Fragment>
        );
    }
}

export default DateRange;
