import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import LocationButton from './LocationButton';
import WeatherList from './WeatherList';

class App extends React.Component {

  state = {
    lat: 33.753746,
    long: -84.386330,
    weatherData: null
  }

  onSearchSubmit = async (term) => {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        key: process.env.REACT_APP_GOOGLE_API,
        address: term
       }
    });

    const { lat, lng } = response.data.results[0].geometry.location;

    this.setState({
      lat: lat,
      long: lng })
  }

  onLocationClick = () => {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude, long: position.coords.longitude}) ,
      err => console.log(err.message)
    );
  }

  UNSAFE_componentWillMount = async () => {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/onecall', {
      params: {
        appid: process.env.REACT_APP_WEATHER_API,
        lat: this.state.lat,
        lon: this.state.long,
        units: 'imperial'
      }
    });
    console.log(response.data);
    this.setState({ weatherData: response.data });
  }

  componentDidUpdate = async (prevState) => {

    if (this.state.lat !== prevState.lat || this.state.long !== prevState.long) {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/onecall', {
        params: {
          appid: process.env.REACT_APP_WEATHER_API,
          lat: this.state.lat,
          lon: this.state.long,
          units: 'imperial'
        }
      });

      this.setState({ weatherData: response.data });
    }
  }

  render() {
    return (
      <div className="ui container" style={{marginTop: '10px'}}>
        <LocationButton onClick={this.onLocationClick} />
        <SearchBar onSubmit={this.onSearchSubmit} />
        Lat: {this.state.lat} <br/>
        Long: {this.state.long} <br/>
        <WeatherList data={this.state.weatherData} />
      </div>
    );
  }
}

export default App;
