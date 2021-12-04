import React, { Component } from "react";

const CheckBox = props => {
    return (
        <p className="weekdayCheckbox">
       <input key={props.id} onChange={props.handleCheckElement} onClick={props.handleCheckElement} type="checkbox" checked={props.isChecked} value={props.value} /> {props.value}
       </p>
    );
}

class WeekDayPicker extends Component {
    state = {
        weekdays: [
            {id: 0, value: "poniedziałek", isChecked: true},
            {id: 1, value: "wtorek", isChecked: true},
            {id: 2, value: "środa", isChecked: true},
            {id: 3, value: "czwartek", isChecked: true},
            {id: 4, value: "piątek", isChecked: true},
            {id: 5, value: "sobota", isChecked: true},
            {id: 6, value: "niedziela", isChecked: true}
        ]
      };

    handleCheckElement = (event) => {
        let weekdays = this.state.weekdays;
        weekdays.forEach(day => {
           if (day.value === event.target.value)
              day.isChecked =  event.target.checked;
        })
        this.setState({weekdays: weekdays});
        this.props.onWeekDaysChange(weekdays.map(day => {
            if (day.isChecked){
                return day.id;
            }
            return null;
        }).filter(id => id !== null));
    }

    render() {
        return (
            <div className="weekdaysPickerContainer">
                {this.state.weekdays.map((day) => {
                    return (<CheckBox key={day.id} handleCheckElement={this.handleCheckElement}  {...day} />)
                })}
            </div>
        );
    }
}

export default WeekDayPicker;