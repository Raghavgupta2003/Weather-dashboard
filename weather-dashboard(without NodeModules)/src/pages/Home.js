import React, { useState } from "react";
import { fetchWeather, fetchForecast } from "../services/weatherService";
import { processForecastData } from "../utils/processForecast";
import "./Home.css"; // Ensure this file is linked for styling
import Loader from "../components/Loader";

const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError(null);
    setWeather(null);
    setForecast([]);

    try {
      const weatherData = await fetchWeather(city);
      const forecastData = await fetchForecast(city);

      setWeather(weatherData);
      setForecast(processForecastData(forecastData));
    } catch (err) {
      console.error("Error Fetching Data:", err.message);
      setError(err.message); // Show the correct error message
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchWeatherData();
  };

  const handleRefresh = () => {
    fetchWeatherData();
  };

  return (
    <div className={`container ${!weather ? "weather-background" : ""}`}>
      <h2>Weather Dashboard</h2>

      {/* Search Input & Button */}
      <div className="search-container">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          style={{ width: "100%", maxWidth: "300px" }}
        />
        <button className="btn btn-primary search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Loader */}
      {loading && <Loader />}

      {/* Error Message */}
      {error && <p className="text-danger">⚠️ {error}</p>}

      {/* Weather Card */}
      {weather && (
        <div className="card weather-card mt-3 p-3">
          <div className="weather-card-content">
            {/* Weather Icon */}
            <div className="weather-icon-container">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt={weather.weather[0].description}
                className="weather-icon"
              />
            </div>

            {/* Weather Details */}
            <div className="weather-details">
              <h3>{weather.name}</h3>
              <p>🌡️ Temperature: {weather.main.temp}°C</p>
              <p>🌤️ Condition: {weather.weather[0].description}</p>
              <p>💧 Humidity: {weather.main.humidity}%</p>
              <p>💨 Wind Speed: {weather.wind.speed} km/h</p>

              {/* Refresh Button */}
              <button className="btn btn-secondary refresh-button mt-2" onClick={handleRefresh}>
                🔄 Refresh
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5-Day Forecast */}
      {forecast.length > 0 && (
        <div className="forecast mt-4">
          <h3>5-Day Forecast</h3>
          <div className="forecast-container">
            {forecast.map(([date, temps]) => (
              <div key={date} className="forecast-box">
                <h4>{date}</h4>
                <p>🌅 Morning: {temps.morning ?? "N/A"}°C</p>
                <p>🌞 Afternoon: {temps.afternoon ?? "N/A"}°C</p>
                <p>🌆 Evening: {temps.evening ?? "N/A"}°C</p>
                <p>🌙 Overnight: {temps.overnight ?? "N/A"}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
