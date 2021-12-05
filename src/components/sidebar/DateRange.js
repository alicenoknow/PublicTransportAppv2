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
        const d = new Date(date);
        const outDate = d.getUTCFullYear() + "-" + d.getUTCMonth() + "-" + d.getUTCDate();
        this.props.onStartDateChange(outDate);
    }

    setEndDate = (date) => { 
        this.setState({ endDate: date });
        const d = new Date(date);
        const outDate = d.getUTCFullYear() + "-" + d.getUTCMonth() + "-" + d.getUTCDate();
        this.props.onEndDateChange(outDate);
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
