import React from 'react';
import css from './stylesheet.css';
import $ from 'jquery';

// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'default',
      check_in_date: null,
      check_out_date: null,
      dateInputToggle: true,
      offerData: null
    };
    this.handleCheckin = this.handleCheckin.bind(this);
    this.enterCheckin = this.enterCheckin.bind(this);
    this.dateReset = this.dateReset.bind(this);
  }

  // componentDidMount() {
  //   Date.prototype.yyyymmdd = function() {
  //     var mm = this.getMonth() + 1; // getMonth() is zero-based
  //     var dd = this.getDate();

  //     return [this.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('');
  //   };

  //   var date = new Date();

  //   this.setState({
  //     check_in_date: date.yyyymmdd()
  //   });
  // }

  dateReset() {
    console.log('data reset');
    this.setState({
      check_in_date: null,
      check_out_date: null,
      offerData: null
    });
  }

  handleCheckin() {
    this.setState({
      view: 'checkin'
    });
  }

  enterCheckin(year, month, date) {
    month = month.toString().padStart(2, '0');
    date = date.toString().padStart(2, '0');
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
          // http://traveltipster-fec-booking-service-dev.us-west-2.elasticbeanstalk.com
          `http://traveltipster-fec-booking-service-dev.us-west-2.elasticbeanstalk.com/0/vacancy?check_in_date=${
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
    return (
      <div>
        <Checkin
          check_in_date={this.state.check_in_date}
          check_out_date={this.state.check_out_date}
          onclickin={this.enterCheckin}
          dateReset={this.dateReset}
          offerData={this.state.offerData}
        />
      </div>
    );
  }
}

class Default extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  handleMouseIn() {
    this.setState({ hover: !this.state.hover });
  }

  render() {
    return (
      <div>
        <div>
          <button class="checkin" onClick={this.props.onclick}>
            Check In
            <br />
            {this.props.check_in_date}
            {/* <div>on hover here we will show the tooltip</div>
            <div>
              <div class="tooltip tooltiptext" style={tooltipStyle}>
                this is the tooltip!!
              </div>
            </div> */}
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button class="checkout" onClick={this.props.onclick}>
            Check Out
            <br />
            {this.props.check_out_date}
          </button>
        </div>
        <br />
        <div>
          <button class="guests">Guests</button>
        </div>
      </div>
    );
  }
}

class Checkin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  offerData() {
    if (this.props.offerData) {
      console.table(this.props.offerData);
      let offerDataTop4 = this.props.offerData.slice(0, 3);
      return offerDataTop4.map(offer => (
        <tr>
          <td>{offer.brokerage.name}</td>
          <td>
            <b>${offer.price}</b>
          </td>
          <td class="deal">
            <b>View Deal</b>
          </td>
        </tr>
      ));
    }
  }

  setStyleCheckIn(month, day) {
    if (
      this.props.check_in_date &&
      parseInt(this.props.check_in_date.slice(-4, -2)) === month + 1 &&
      parseInt(this.props.check_in_date.slice(-2)) === day
    ) {
      return { border: '1px solid SeaGreen' };
    } else if (
      this.props.check_out_date &&
      parseInt(this.props.check_out_date.slice(-4, -2)) === month + 1 &&
      parseInt(this.props.check_out_date.slice(-2)) === day
    ) {
      return { border: '1px solid #ef6945' };
    } else {
      return { border: 'white' };
    }
  }

  handleMouseIn() {
    console.log('clicked');
    this.setState({ hover: !this.state.hover });
  }

  render() {
    if (this.props.check_out_date && this.state.hover) {
      console.log('hover false');
      this.setState({ hover: false });
    }

    const tooltipStyle = {
      display: this.state.hover ? 'block' : 'none'
    };

    let today = new Date();
    let thisYear = today.getFullYear();
    let thisMonth = today.getMonth();
    let nextMonth = new Date();
    nextMonth.setMonth(thisMonth + 1);
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
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
                return <td class="past">{day}</td>;
              } else if (
                this.props.check_in_date &&
                (month + 1).toString().padStart(2, '0') + (day && day.toString().padStart(2, '0')) <
                  this.props.check_in_date.slice(-4)
              ) {
                return (
                  <td
                    style={this.setStyleCheckIn(month, day)}
                    class="enabled past"
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
              } else if (month === thisMonth && day === today.getDate()) {
                return (
                  <td
                    style={this.setStyleCheckIn(month, day)}
                    class="enabled today"
                    onClick={() =>
                      this.props.onclickin(
                        endOfDayOfMonth.getFullYear(),
                        endOfDayOfMonth.getMonth() + 1,
                        day
                      )
                    }
                  >
                    <br />
                    {day}
                    <br />
                    &#9679;
                  </td>
                );
              } else {
                return (
                  <td
                    style={this.setStyleCheckIn(month, day)}
                    class="enabled"
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
      <div class="row">
        <div>
          <button
            class="checkin"
            onClick={() => {
              this.props.dateReset();
              this.handleMouseIn.bind(this)();
            }}
          >
            Check In
            <br />
            {this.props.check_in_date}
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button class="checkout">
            Check Out
            <br />
            {this.props.check_out_date}
          </button>
        </div>
        <br />
        <div>
          <button class="guests">Guests</button>
        </div>
        <br />
        {/* <div class="column">Check In {this.props.check_in_date}</div>
        <div class="column">Check Out {this.props.check_out_date}</div> */}

        <div class="tooltip tooltiptext" style={tooltipStyle}>
          <div class="row">
            <div class="column">
              <h2 class="month">
                {monthNames[thisMonth]} {thisYear}
              </h2>
              <table>
                <tr />
                <tr>
                  <th>SUN</th>
                  <th>MON</th>
                  <th>TUE</th>
                  <th>WED</th>
                  <th>THU</th>
                  <th>FRI</th>
                  <th>SAT</th>
                </tr>
                {createCalendar(thisMonth)}
              </table>
            </div>
            <div class="column">
              <h2 class="month">
                {monthNames[(thisMonth + 1) % 12]} {thisYear}
              </h2>
              <table>
                <tr />
                <tr>
                  <th>SUN</th>
                  <th>MON</th>
                  <th>TUE</th>
                  <th>WED</th>
                  <th>THU</th>
                  <th>FRI</th>
                  <th>SAT</th>
                </tr>
                {createCalendar(thisMonth + 1)}
              </table>
            </div>
          </div>
        </div>
        <div>
          <table id="offers">{this.offerData()}</table>
        </div>
      </div>
    );
  }
}
