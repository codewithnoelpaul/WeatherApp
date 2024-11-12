import {useState} from 'react';
import {fetchWeatherData, WeatherData} from './HomeModel';

interface HomeViewModel {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (city: string) => Promise<void>;
}

const kelvinToCelsius = (kelvin: number): number => {
  return Math.round(kelvin - 273.15);
};

const useHomeViewModel = (): HomeViewModel => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    try {
      let data = await fetchWeatherData(city);
      data.main.temp = kelvinToCelsius(data.main.temp);
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {weatherData, loading, error, fetchWeather};
};

export default useHomeViewModel;
