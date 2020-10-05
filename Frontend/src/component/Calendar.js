import React from "react"
import moment from 'moment';
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

class Calendar extends React.Component {
  
  state = {
    date: null,
    focusedInput: null,
  };
  
  onDatesChange = (date) => {
    this.setState({ 
      date: date
    }, () => {
      let parsedDate = moment(this.state.date).format("YYYY-MM-DD")
      this.props.getDate(parsedDate)
      this.props.updateDateSelected()
    });
  };

  onFocusChange = focusedInput => {
    this.setState({ focusedInput });
  };

  dayBlockedHandler = day => {
    let unavailableDates = []
    for ( let i = 0; i < this.props.reservations.length; i++){
      unavailableDates.push(this.props.reservations[i].reserved_date)
    }
    const dateAsString = day.format("YYYY-MM-DD");
    const blockedDate = unavailableDates.find(d => d === dateAsString);
    if (blockedDate) {
      return true
    }
    return false;
  }
  
  render() {
    return (
        <SingleDatePicker
          date={this.state.date}
          placeholder="Choose a Date"
          onDateChange={date => this.onDatesChange(date)}
          focused={this.state.focused}
          onFocusChange={({ focused }) => this.setState({ focused })}
          id="Choose a Date"
          isDayBlocked={this.dayBlockedHandler}
          openDirection="up"
        />
    );
  }
}
export default Calendar;