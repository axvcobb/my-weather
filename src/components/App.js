import React from 'react';

class App extends React.Component {

  state = {
    lat: 33.753746,
    long: -84.386330
  }

  render() {
    return (
      <div className="ui container" style={{marginTop: '10px'}}>
        App
      </div>
    );
  }
}

export default App;
