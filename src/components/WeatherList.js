import React from 'react';
import Spinner from './Spinner';
import WeatherCard from './WeatherCard';
import CurrentCard from './CurrentCard';

const WeatherList = (props) => {

  if (props.data === null) {
    return <Spinner />;
  } else {
    const dailies = props.data.daily.slice(1).map((daily) => {
      return <WeatherCard key={daily.dt} data={daily} />
    });
    return (
      <div>
        <div className="ui center aligned header">
          <h1>{props.location}</h1>
        </div>
        <div className="ui centered cards">
          <CurrentCard current={props.data.current} daily={props.data.daily[0]} />
          {dailies}
        </div>
      </div>
    );
  }
}

export default WeatherList;
