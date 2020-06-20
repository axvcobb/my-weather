import React from 'react';

class WeatherCard extends React.Component {

  formatDate(date) {
    var year = date.getYear();
    var month = (1 + date.getMonth()).toString();
    var day = date.getDate().toString();
    var dayOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][ date.getDay() ];

    return dayOfWeek + ' - ' + month + '/' + day + '/' + year;
  }

  render() {
    var date = new Date(this.props.data.dt * 1000);
    return (
      <div className="card">
        <div className="content">
          <div className="header" style={{ textAlign: 'center'}}>{this.props.data.temp.min}&deg; - {this.props.data.temp.max}&deg;</div>
          <div className="meta" style={{ textAlign: 'center'}}>{this.formatDate(date)}</div>
          <div className="description">
            <ul>
              <li>Morning: {this.props.data.feels_like.morn}&deg; </li>
              <li>Evening: {this.props.data.feels_like.eve}&deg; </li>
              <li>Weather: {this.props.data.weather[0].description}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherCard;
