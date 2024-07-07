import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const api = {
  key: 'e7fc78fdc519d68ccf6ae44818f4b25d',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
      });
  }

  return (
    <div className="App">
      <video autoPlay loop muted>
      <source src={`${process.env.PUBLIC_URL}/bg-vid.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <header className="App-header">
        <h1>Weather</h1>

        {/* Search Box */}
        <input
          type='text' 
          placeholder='Enter City/Town'
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={searchPressed}>Search</button>

        {/* Display weather information if available */}
        {typeof weather.main !== 'undefined' ? (
          <div>
            {/* Location */}
            {weather.name && <p>{weather.name}</p>}

            {/* Temperature in Celsius */}
            {weather.main?.temp && <p>{weather.main.temp}°C</p>}

            {/* Conditions */}
            {weather.weather?.[0]?.main && <p>{weather.weather[0].main}</p>}
            {weather.weather?.[0]?.description && <p>({weather.weather[0].description})</p>}
          </div>
        ) : ('')}
        
      </header>
    </div>
  );
}

export default App;
