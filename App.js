import { useState } from 'react';
import './App.css';

const api = {
  key: 'e7fc78fdc519d68ccf6ae44818f4b25d',
  base: 'https://api.openweathermap.org/data/2.5/'
};

const videoMap = {};
  videoMap["clear"]=`${process.env.PUBLIC_URL}/clear-sky.mp4`;
  videoMap["clouds"]= `${process.env.PUBLIC_URL}/clouds.mp4`;
  videoMap["thunderstorm"]= `${process.env.PUBLIC_URL}/thunderstorm.mp4`;
  videoMap["rain"]= `${process.env.PUBLIC_URL}/rain.mp4`;
  videoMap["mist"]= `${process.env.PUBLIC_URL}/rain.mp4`;
  videoMap["snow"]= `${process.env.PUBLIC_URL}/snow.mp4`;
  videoMap["haze"]= `${process.env.PUBLIC_URL}/haze.mp4`;
  videoMap["default"]= `${process.env.PUBLIC_URL}/default.mp4`;
  


function App() {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState({});
  const [videoUrl, setVideoUrl] = useState(videoMap.default);
  const videoUrltest = `${process.env.PUBLIC_URL}/default.mp4`;


  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        console.log('Weather API Result:', result);
        setWeather(result);
        // console.log(result)
        if (result.weather && result.weather.length > 0) {
          const condition = result.weather[0].main.toLowerCase();
          // console.log('Weather Condition:', condition);
          if (videoMap[condition]) {
            setVideoUrl(videoMap[String(condition)]);
            // console.log(condition)
            console.log(videoMap[condition])
            // console.log(videoMap)
          
          } else {
            setVideoUrl(videoMap.default);
          }
        } else {
          // Handle case where weather data is not available
          console.error('Weather data not available:', result);
          
        }
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        // Optionally handle the error here
      });
  };
  

  return (
    <div className="App">
      <header className="App-header">
      <video src={videoUrl} type="video/mp4" alt="error" autoPlay loop muted>
        {/* <source  /> */}
        {/* <h1>hello</h1> */}
        Your browser does not support the video tag.
      </video>
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="Enter City/Town"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={searchPressed}>Search</button>
        {typeof weather.main !== 'undefined' ? (
          <div>
            {weather.name && <p>{weather.name}</p>}
            {weather.main?.temp && <p>{weather.main.temp}°C</p>}
            {weather.weather?.[0]?.main && <p>{weather.weather[0].main}</p>}
            {weather.weather?.[0]?.description && <p>({weather.weather[0].description})</p>}
          </div>
        ) : (
          ''
        )}
      </header>
    </div>
  );
}

export default App;

