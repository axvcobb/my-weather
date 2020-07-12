import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import LocationButton from './LocationButton';
import WeatherList from './WeatherList';

class App extends React.Component {

  state = {
    lat: 33.753746,
    long: -84.386330,
    weatherData: null,
    weatherLocation: '',
    term: ''
  }

  onSearchSubmit = async (term) => {
    this.setState({ term: term });
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        key: process.env.REACT_APP_GOOGLE_API,
        address: term
       }
    });

    if(response.data.results.length !== 0){
      const { lat, lng } = response.data.results[0].geometry.location;

      this.setState({
        lat: lat,
        long: lng });
    }
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
    const location = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        key: process.env.REACT_APP_GOOGLE_API,
        latlng: this.state.lat + ',' + this.state.long,
        result_type: 'locality'
       }
    });

    const sanitizedLocation = location.data.results.length > 0 ? location.data.results[0].formatted_address : this.state.term;
    this.setState({ weatherData: response.data, weatherLocation: sanitizedLocation });
  }

  componentDidUpdate = async (prevProps, prevState) => {

    if (this.state.lat !== prevState.lat || this.state.long !== prevState.long) {
      const weather = await axios.get('https://api.openweathermap.org/data/2.5/onecall', {
        params: {
          appid: process.env.REACT_APP_WEATHER_API,
          lat: this.state.lat,
          lon: this.state.long,
          units: 'imperial'
        }
      });

      const location = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          key: process.env.REACT_APP_GOOGLE_API,
          latlng: this.state.lat + ',' + this.state.long,
          result_type: 'locality'
         }
      });

      const sanitizedLocation = location.data.results.length > 0 ? location.data.results[0].formatted_address : this.state.term;
      this.setState({ weatherData: weather.data, weatherLocation: sanitizedLocation });
    }
  }

  render() {
    return (
      <div className="ui container" style={{marginTop: '10px'}}>
        <LocationButton onClick={this.onLocationClick} />
        <SearchBar onSubmit={this.onSearchSubmit} />
        <WeatherList location={this.state.weatherLocation} data={this.state.weatherData} />
      </div>
    );
  }
}

export default App;
