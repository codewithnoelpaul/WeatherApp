import {useState} from 'react';
import {fetchWeatherData, WeatherData} from './HomeModel';

interface HomeViewModel {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (city: string) => Promise<void>;
}

const useHomeViewModel = (): HomeViewModel => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    try {
      const data = await fetchWeatherData(city);
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
