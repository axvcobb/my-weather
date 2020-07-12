import React from 'react';

class CurrentCard extends React.Component {

  formatDate(unix) {
    var date = new Date(unix);
    var year = date.getYear() - 100;
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
    console.log(this.props.daily);
    const iconSrc = 'http://openweathermap.org/img/wn/' + this.props.current.weather[0].icon + '.png';
    return (
      <div className="card">
        <div className="content">
          <div className="header" style={{ textAlign: 'center'}}><img src={iconSrc} alt={this.props.current.weather[0].main} /></div>
          <div className="header" style={{ textAlign: 'center'}}>{this.props.current.temp}&deg;</div>
          <div className="meta" style={{ textAlign: 'center'}}>{this.formatDate(this.props.current.dt * 1000)}</div>
          <div className="description">
            <ul>
              <li><strong>Feels Like: </strong>{this.props.current.feels_like}&deg;</li>
              <li><strong>Sunset: </strong>{this.formatTime(this.props.current.sunset * 1000)}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentCard;
