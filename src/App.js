import React, { useState } from 'react';
import axios from 'axios';
import Footer from './Footer.js'; // Import the Footer component
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const apiKey = '304dc50daf54f7cf1abc895ea03a0ac2';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      if (!isValidCityName(location)) {
        setError("Please enter a valid city name.");
        setSuccess(''); // Clear success message if there's an error
        setTimeout(() => {
          setError('');
        }, 3000);
        return;
      }
  
      const cityName = location; // Capture city name before the API call
  
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
        setError('');
        setSuccess(`Yay! Let's see what the weather's like today in ${response.data.name} 🌞`);
        setTimeout(() => {
          setSuccess('');
        }, 3000);
      }).catch((error) => {
        console.error("Error fetching weather data:", error);
        setError(`Unable to locate ${cityName}. Please try again with a different city name 🫢`);
        setSuccess(''); // Clear success message if there's an error
        setTimeout(() => {
          setError('');
        }, 3000);
      });
  
      setLocation('');
    }
  };

  const isValidCityName = (cityName) => {
    // Basic check for city name validity (only letters and spaces)
    const cityRegex = /^[a-zA-Z\s]+$/;
    return cityRegex.test(cityName);
  };

  return (
    <div className="app">
      <h1 className="header"><b>Weather App</b></h1>
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p><b>{data.weather[0].main}</b></p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} KM/H</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
      <Footer />
    </div>
  );
}

export default App;







