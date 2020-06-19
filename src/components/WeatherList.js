import React from 'react';
import Spinner from './Spinner';
import WeatherCard from './WeatherCard';

const WeatherList = (props) => {

  if (props.data === null) {
    console.log('Waiting for data');
    return <Spinner />;
  } else {
    const dailies = props.data.daily.map((daily) => {
      return <WeatherCard key={daily.dt} data={daily} />
    });
    return (
      <div className="ui cards">
        <WeatherCard data={props.data.current} />
        {dailies}
      </div>
    );
  }
}

export default WeatherList;
