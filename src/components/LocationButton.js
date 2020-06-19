import React from 'react';

class LocationButton extends React.Component {

  render() {
    return (
      <div className="ui" style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={this.props.onClick} className="ui primary button">Auto-locate Me!</button>
      </div>
    );
  }
}

export default LocationButton;
