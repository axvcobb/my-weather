import React from 'react';
import Spinner from './Spinner';
import WeatherCard from './WeatherCard';
import CurrentCard from './CurrentCard';

const WeatherList = (props) => {

  if (props.data === null) {
    console.log('Waiting for data');
    return <Spinner />;
  } else {
    const dailies = props.data.daily.slice(1).map((daily) => {
      return <WeatherCard key={daily.dt} data={daily} />
    });
    return (
      <div className="ui centered cards">
        <CurrentCard current={props.data.current} daily={props.data.daily[0]} />
        {dailies}
      </div>
    );
  }
}

export default WeatherList;
