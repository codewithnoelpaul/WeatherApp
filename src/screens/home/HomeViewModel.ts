import {useState} from 'react';
import {City, fetchWeatherData, WeatherData} from './HomeModel';
import apiManager from '../../services/ApiManager';

interface HomeViewModel {
  weatherData: WeatherData | null;
  cityData: City[] | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (city: string) => Promise<void>;
  fetchCities: (query: string) => Promise<void>;
}

const kelvinToCelsius = (kelvin: number): number => {
  return Math.round(kelvin - 273.15);
};

const useHomeViewModel = (): HomeViewModel => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cityData, setCityData] = useState<City[] | null>(null);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    try {
      let data = await fetchWeatherData(city);
      data.main.temp = kelvinToCelsius(data.main.temp);
      data.main.feels_like = kelvinToCelsius(data.main.feels_like);
      data.main.temp_min = kelvinToCelsius(data.main.temp_min);
      data.main.temp_max = kelvinToCelsius(data.main.temp_max);

      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async (query: string): Promise<void> => {
    if (query.length < 2) return;

    try {
      const cities: City[] = await apiManager.getGeocoding<City[]>('direct', {
        q: query,
        limit: 5,
        appid: 'ad48ef57fc073616eec522064a175756',
      });
      setCityData(cities);
    } catch (err) {
      console.error('Error fetching cities:', err);
    }
  };

  return {weatherData, cityData, loading, error, fetchWeather, fetchCities};
};

export default useHomeViewModel;
