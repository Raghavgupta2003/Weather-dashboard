export const processForecastData = (forecastData) => {
    const dailyForecast = {};
  
    forecastData.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0]; // Extract date (YYYY-MM-DD)
      const hour = new Date(item.dt * 1000).getHours(); // Extract hour
  
      if (!dailyForecast[date]) {
        dailyForecast[date] = { morning: null, afternoon: null, evening: null, overnight: null };
      }
  
      if (hour >= 6 && hour < 12) dailyForecast[date].morning = item.main.temp;
      else if (hour >= 12 && hour < 18) dailyForecast[date].afternoon = item.main.temp;
      else if (hour >= 18 && hour < 24) dailyForecast[date].evening = item.main.temp;
      else if (hour >= 0 && hour < 6) dailyForecast[date].overnight = item.main.temp;
    });
  
    return Object.entries(dailyForecast).slice(0, 5); // Return first 5 days
  };
  