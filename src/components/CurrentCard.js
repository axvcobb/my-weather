import React from 'react';

class CurrentCard extends React.Component {

  formatDate(unix) {
    var date = new Date(unix);
    var year = date.getYear();
    var month = (1 + date.getMonth()).toString();
    var day = date.getDate().toString();
    var dayOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][ date.getDay() ];

    return dayOfWeek + ' - ' + month + '/' + day + '/' + year;
  }


  render() {
    console.log(this.props.daily);
    return (
      <div className="card">
        <div className="content">
          <div className="header" style={{ textAlign: 'center'}}>{this.props.current.temp}&deg;</div>
          <div className="meta" style={{ textAlign: 'center'}}>{this.formatDate(this.props.current.dt * 1000)}</div>
          <div className="description">
            <ul>
              <li>Feels Like: {this.props.current.feels_like}&deg;</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentCard;
