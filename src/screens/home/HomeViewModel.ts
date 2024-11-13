import {useState} from 'react';
import {City, fetchWeatherData, WeatherData} from './HomeModel';
import apiManager from '../../services/ApiManager';

interface HomeViewModel {
  weatherData: WeatherData | null;
  cityData: City[] | null;
  currentLocationData: WeatherData | null;
  loading: boolean;
  isSearchLoading: boolean;
  error: string | null;
  fetchWeather: (city: string) => Promise<void>;
  fetchCities: (query: string) => Promise<void>;
  fetchWeatherByLocation: (lat: number, lon: number) => Promise<void>;
}

const kelvinToCelsius = (kelvin: number): number => {
  return Math.round(kelvin - 273.15);
};

const useHomeViewModel = (): HomeViewModel => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cityData, setCityData] = useState<City[] | null>(null);
  const [currentLocationData, setCurrentLocationData] =
    useState<WeatherData | null>(null);

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
    setIsSearchLoading(true)
    try {
      const cities: City[] = await apiManager.getGeocoding<City[]>('direct', {
        q: query,
        limit: 5,
        appid: 'ad48ef57fc073616eec522064a175756',
      });
      console.log('fetchCities Response -', cities);
      
      setCityData(cities);
      setIsSearchLoading(false)
    } catch (err) {
      console.error('Error fetching cities:', err);
      setIsSearchLoading(false)
    }
  };

  const fetchWeatherByLocation = async (lat: number, lon: number) => {
    setLoading(true);
    try {
      const data: WeatherData = await apiManager.get('weather', {
        lat,
        lon,
        appid: 'ad48ef57fc073616eec522064a175756',
      });

      data.main.temp = kelvinToCelsius(data.main.temp);
      data.main.feels_like = kelvinToCelsius(data.main.feels_like);
      data.main.temp_min = kelvinToCelsius(data.main.temp_min);
      data.main.temp_max = kelvinToCelsius(data.main.temp_max);
      setCurrentLocationData(data);
      // setWeatherData(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    weatherData,
    cityData,
    currentLocationData,
    loading,
    isSearchLoading,
    error,
    fetchWeather,
    fetchCities,
    fetchWeatherByLocation,
  };
};

export default useHomeViewModel;
