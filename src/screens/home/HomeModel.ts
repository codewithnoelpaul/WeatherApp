import ApiManager from '../../services/ApiManager';

export const apiKey = 'ad48ef57fc073616eec522064a175756';

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherMain {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface WeatherSys {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
}

export interface WeatherWind {
  deg: number;
  speed: number;
}

export interface WeatherCoord {
  lat: number;
  lon: number;
}

export interface WeatherData {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: WeatherCoord;
  dt: number;
  id: number;
  main: WeatherMain;
  name: string;
  sys: WeatherSys;
  timezone: number;
  visibility: number;
  weather: WeatherCondition[];
  wind: WeatherWind;
}

export interface City {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface RecentSearch {
  id: number;
  lat: number;
  long: number;
}

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  return await ApiManager.get<WeatherData>('weather', {q: city, appid: apiKey});
};
