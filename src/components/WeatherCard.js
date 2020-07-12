import React from 'react';

class WeatherCard extends React.Component {

  formatDate(unix) {
    var date = new Date(unix);
    var year = date.getYear();
    var month = (1 + date.getMonth()).toString();
    var day = date.getDate().toString();
    var dayOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][ date.getDay() ];

    return dayOfWeek + ' ' + month + '/' + day + '/' + year;
  }

  formatTime(unix) {
    var date = new Date(unix);
    var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var minutes = "0" + date.getMinutes();

    return hours + ':' + minutes.substr(-2) + 'pm';
  }

  render() {
    const iconSrc = 'http://openweathermap.org/img/wn/' + this.props.data.weather[0].icon + '.png';
    return (
      <div className="card">
        <div className="content">
          <div className="header" style={{ textAlign: 'center'}}><img src={iconSrc} alt={this.props.data.weather[0].main} /></div>
          <div className="header" style={{ textAlign: 'center'}}>{this.props.data.temp.min}&deg; - {this.props.data.temp.max}&deg;</div>
          <div className="meta" style={{ textAlign: 'center'}}>{this.formatDate(this.props.data.dt * 1000)}</div>
          <div className="description">
            <ul>
              <li>Weather: {this.props.data.weather[0].description}</li>
              <li>Morning: {this.props.data.feels_like.morn}&deg; </li>
              <li>Evening: {this.props.data.feels_like.eve}&deg; </li>
              <li>Sunset: {this.formatTime(this.props.data.sunset * 1000 )}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherCard;
