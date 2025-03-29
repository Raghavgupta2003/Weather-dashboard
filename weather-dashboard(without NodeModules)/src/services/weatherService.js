import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

/**
 * Fetch current weather data for a city.
 */
export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Fetch 5-day weather forecast for a city.
 */
export const fetchForecast = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city, // Ensuring city is searched within India
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Handles API errors and throws meaningful messages.
 */
const handleApiError = (error) => {
  if (error.response) {
    const status = error.response.status;
    if (status === 404) {
      throw new Error("City not found. Please enter a valid city name.");
    } else if (status === 401) {
      throw new Error("Invalid API key. Please check your API key.");
    } else {
      throw new Error("Something went wrong. Please try again later.");
    }
  } else {
    throw new Error("Network error. Please check your connection.");
  }
};


