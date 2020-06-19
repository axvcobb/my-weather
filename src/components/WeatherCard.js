import React from 'react';

class WeatherCard extends React.Component {

  render() {
    if (typeof(this.props.data.temp) === 'number') {
      var temp = this.props.data.temp;
    } else {
      var temp = this.props.data.temp.min + ' - ' + this.props.data.temp.max;
    }
    var date = new Date(this.props.data.dt * 1000).toString();
    return (
      <div className="card">
        <div className="content">
          <div className="header">{temp}</div>
          <div className="meta">{date}</div>
          <div className="description">
            Elliot Fu is a film-maker from New York.
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherCard;
