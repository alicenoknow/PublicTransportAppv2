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
        const yourDate = d.toISOString().split('T')[0];
        // const month = (d.getUTCMonth() === 10 || d.getUTCMonth() === 11) ? (d.getUTCMonth() + 1) : "0" + (d.getUTCMonth() + 1);
        // const outDate = d.getUTCFullYear() + "-" + month + "-" + d.getUTCDate() + 1;
        this.props.onStartDateChange(yourDate);
    }

    setEndDate = (date) => { 
        this.setState({ endDate: date });
        const d = new Date(date);
        const yourDate = d.toISOString().split('T')[0];

        // const month = (d.getUTCMonth() === 10 || d.getUTCMonth() === 11) ? (d.getUTCMonth() + 1) : "0" + (d.getUTCMonth() + 1);
        // const outDate = d.getUTCFullYear() + "-" + month + "-" + d.getUTCDate() + 1;
        this.props.onEndDateChange(yourDate);
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
