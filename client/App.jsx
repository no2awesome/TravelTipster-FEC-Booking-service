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
      dateInputToggle: true
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
    month = month.toString().padStart(2,'0');
    date = date.toString().padStart(2,'0');
    if (this.state.dateInputToggle) {
      this.setState({
        check_in_date: `${year}-${month}-${date}`,
        dateInputToggle: !this.state.dateInputToggle
      });
    } else {
      if (this.state.check_in_date < `${year}-${month}-${date}`) {
        $.get('http://127.0.0.1:3000/0/vacancy?check_in_date=20190101&check_out_date=20190103&number_of_rooms=1&number_of_adults=2&number_of_children=2')
        this.setState({
          check_out_date: `${year}-${month}-${date}`,
          dateInputToggle: !this.state.dateInputToggle
        });
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
  render() {
    let today = new Date();
    let thisYear = today.getFullYear();
    let thisMonth = today.getMonth();
    let nextMonth = new Date();
    nextMonth.setMonth(thisMonth + 1);
    let thisMonthDates = [];
    for (
      let i = 1;
      i <= new Date(new Date().getFullYear(), thisMonth + 1, 0).getDate();
      i++
    ) {
      thisMonthDates.push(i);
    }
    thisMonthDates = thisMonthDates.map(day => {
      if (day < today.getDate()) {
        return <button disabled>{day}</button>;
      } else {
        return (
          <button
            onClick={() => this.props.onclickin(thisYear, thisMonth + 1, day)}
          >
            {day}
          </button>
        );
      }
    });

    let nextMonthDates = [];
    for (let i = 1; i <= new Date(thisYear, thisMonth + 2, 0).getDate(); i++) {
      nextMonthDates.push(i);
    }
    nextMonthDates = nextMonthDates.map(day => (
      <button
        onClick={() =>
          this.props.onclickin(
            nextMonth.getFullYear(),
            nextMonth.getMonth() + 1,
            day
          )
        }
      >
        {day}
      </button>
    ));

    return (
      <div>
        <div>Check In {this.props.check_in_date}</div>
        <div>Check Out {this.props.check_out_date}</div>
        <div class="check">
          {thisMonth + 1}
          <br />
          {thisMonthDates}
        </div>
        <div class="check">
          {nextMonth.getMonth() + 1}
          <br />
          {nextMonthDates}
        </div>
      </div>
    );
  }
}

// export default App;
