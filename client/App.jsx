import React from "react";
import css from "./stylesheet.css";
import $ from "jquery";
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "checkin",
      check_in_date: null,
      check_out_date: null,
      dateInputToggle: true,
      offerData: null
    };
    this.handleCheckin = this.handleCheckin.bind(this);
    this.enterCheckin = this.enterCheckin.bind(this);
  }

  handleCheckin() {
    this.setState({
      view: "checkin"
    });
  }

  enterCheckin(year, month, date) {
    month = month.toString().padStart(2, "0");
    date = date.toString().padStart(2, "0");
    if (this.state.dateInputToggle) {
      this.setState({
        check_in_date: `${year}${month}${date}`,
        check_out_date: null,
        offerData: null,
        dateInputToggle: !this.state.dateInputToggle
      });
    } else {
      if (this.state.check_in_date < `${year}${month}${date}`) {
        $.get(
          `${window.location.href}vacancy?check_in_date=${
            this.state.check_in_date
          }&check_out_date=${year}${month}${date}&number_of_rooms=1&number_of_adults=2&number_of_children=2`,
          offerData => {
            this.setState({
              check_out_date: `${year}${month}${date}`,
              dateInputToggle: !this.state.dateInputToggle,
              offerData
            });
          }
        );
      }
    }
  }

  render() {
    if (this.state.view === "default") {
      return <Default onclick={this.handleCheckin} />;
    } else if (this.state.view === "checkin") {
      return (
        <Checkin
          check_in_date={this.state.check_in_date}
          check_out_date={this.state.check_out_date}
          onclickin={this.enterCheckin}
          offerData={this.state.offerData}
        />
      );
    }
  }
}

class Default extends React.Component {
  render() {
    return (
      <div class="row">
        <div class="column" onClick={this.props.onclick}>
          check in
        </div>
        <div class="column">check out</div>
      </div>
    );
  }
}

class Checkin extends React.Component {
  offerData() {
    if (this.props.offerData) {
      console.table(this.props.offerData);
      return this.props.offerData.map(offer => <div>{offer.price}</div>);
    }
  }

  render() {
    let today = new Date();
    let thisYear = today.getFullYear();
    let thisMonth = today.getMonth();
    let nextMonth = new Date();
    nextMonth.setMonth(thisMonth + 1);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    let createCalendar = month => {
      let MonthDates = [];
      let endOfDayOfMonth = new Date(new Date().getFullYear(), month + 1, 0);
      for (let i = 1; i <= endOfDayOfMonth.getDate(); i++) {
        let day = new Date();
        day.setMonth(month);
        day.setDate(i);
        let week = Math.ceil((day.getDate() - day.getDay() - 1) / 7);
        if (!MonthDates[week]) MonthDates.push([]);
        MonthDates[week].push(i);
      }
      while (MonthDates[0].length < 7) {
        MonthDates[0].unshift(null);
      }
      MonthDates = MonthDates.map(dates => {
        return (
          <tr>
            {dates.map(day => {
              if (month === thisMonth && day < today.getDate()) {
                return <td >{day}</td>;
              } else {
                return (
                  <td class='enabled'
                    onClick={() =>
                      this.props.onclickin(
                        endOfDayOfMonth.getFullYear(),
                        endOfDayOfMonth.getMonth() + 1,
                        day
                      )
                    }
                  >
                    {day}
                  </td>
                );
              }
            })}
          </tr>
        );
      });
      return MonthDates;
    };

    return (
      <div>
        <div>Check In {this.props.check_in_date}</div>
        <div>Check Out {this.props.check_out_date}</div>
        <div class="row">
          <div class="column">
            <br />
            {monthNames[thisMonth]} {thisYear}
            <table>
              <tr />
              <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
              </tr>
              {createCalendar(thisMonth)}
            </table>
          </div>
          <div class="column">
            {monthNames[(thisMonth + 1) % 12]} {thisYear}
            <br />
            <table>
              <tr />
              <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
              </tr>
              {createCalendar(thisMonth + 1)}
            </table>
          </div>
        </div>
        <div>{this.offerData()}</div>
      </div>
    );
  }
}

// export default App;
