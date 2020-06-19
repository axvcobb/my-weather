import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import LocationButton from './LocationButton';

class App extends React.Component {

  state = {
    lat: 33.753746,
    long: -84.386330
  }

  onSearchSubmit = async (term) => {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        key: process.env.REACT_APP_GOOGLE_API,
        address: term
       }
    });

    this.setState({
      lat: response.data.results[0].geometry.location.lat,
      long: response.data.results[0].geometry.location.lng })
  }

  onLocationClick = async () => {
    /* window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude, long: position.coords.longitude}) ,
      err => console.log(err.message)
    ); */
    const response = await axios.get('https://api.openweathermap.org/data/2.5/onecall', {
      params: {
        appid: process.env.REACT_APP_WEATHER_API,
        lat: this.state.lat,
        lon: this.state.long
      }
    });
    console.log(response);
  }

  render() {
    return (
      <div className="ui container" style={{marginTop: '10px'}}>
        <LocationButton onClick={this.onLocationClick} />
        <SearchBar onSubmit={this.onSearchSubmit} />
        Lat: {this.state.lat} <br/>
        Long: {this.state.long}
      </div>
    );
  }
}

export default App;
