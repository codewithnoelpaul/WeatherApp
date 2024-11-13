import {useState} from 'react';
import apiManager from '../../services/ApiManager';
import {WeatherData} from '../home/HomeModel';

interface DetailsViewModel {
  weatherData: WeatherData | null;
  loading: boolean;
  fetchWeatherByLocation: (lat: number, lon: number) => Promise<void>;
}

const kelvinToCelsius = (kelvin: number): number => {
  return Math.round(kelvin - 273.15);
};

const useDetailsViewModel = (): DetailsViewModel => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
      data.visibility = data.visibility/1000;
      console.log("fetchWeatherByLocation Reponse - ",data);
      
      setWeatherData(data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return {
    weatherData,
    loading,
    fetchWeatherByLocation,
  };
};

export default useDetailsViewModel;
