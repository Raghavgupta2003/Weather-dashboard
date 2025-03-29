const WeatherCard = ({ weather }) => {
    return (
      <div className="card p-3 shadow-lg">
        <h2>{weather.name}</h2>
        <h3>{weather.main.temp}°C</h3>
        <p>{weather.weather[0].description}</p>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind Speed: {weather.wind.speed} km/h</p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          alt="weather icon"
        />
      </div>
    );
  };
  
  export default WeatherCard;
  