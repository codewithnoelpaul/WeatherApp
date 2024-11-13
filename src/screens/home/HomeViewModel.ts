import {useState, useEffect} from 'react';
import SQLite, {SQLiteDatabase, ResultSet} from 'react-native-sqlite-storage';
import {
  apiKey,
  City,
  fetchWeatherData,
  RecentSearch,
  WeatherData,
} from './HomeModel';
import apiManager from '../../services/ApiManager';

interface HomeViewModel {
  weatherData: WeatherData | null;
  cityData: City[] | null;
  currentLocationData: WeatherData | null;
  loading: boolean;
  isSearchLoading: boolean;
  error: string | null;
  recentSearches: RecentSearch[];
  getRecentSearches: () => void;
  fetchWeather: (city: string) => Promise<void>;
  fetchCities: (query: string) => Promise<void>;
  fetchWeatherByLocation: (lat: number, lon: number) => Promise<void>;
}

const kelvinToCelsius = (kelvin: number): number => Math.round(kelvin - 273.15);

const useHomeViewModel = (): HomeViewModel => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cityData, setCityData] = useState<City[] | null>(null);
  const [currentLocationData, setCurrentLocationData] =
    useState<WeatherData | null>(null);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  const db: SQLiteDatabase = SQLite.openDatabase(
    {name: 'searchResults', location: 'default'},
    () => console.log('Database connected!'),
    (error: any) => console.log('Database error:', error),
  );

  useEffect(() => {
    createDatabaseTable();
    getRecentSearches();
  }, []);

  const createDatabaseTable = () => {
    db.executeSql(
      'CREATE TABLE IF NOT EXISTS searchData (id INTEGER PRIMARY KEY AUTOINCREMENT, lat FLOAT, long FLOAT)',
      [],
      () => console.log('Table created successfully'),
      (error: Error) => console.log('Create table error:', error),
    );
  };

  const getRecentSearches = () => {
    setLoading(true);
    db.transaction((tx: any) => {
      tx.executeSql(
        'SELECT * FROM searchData',
        [],
        (tx: any, results: ResultSet) => {
          const data = [];
          for (let i = 0; i < results?.rows?.length; i++) {
            data.push(results.rows.item(i));
          }
          console.log('getRecentSearches -', data);
          setRecentSearches(data);
          setLoading(false);
        },
        (error: Error) => {
          console.log('Error loading contacts:', error);
          setLoading(false);
        },
      );
    });
  };

  const fetchWeather = async (city: string) => {
    setLoading(true);
    try {
      const data = await fetchWeatherData(city);
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
    setIsSearchLoading(true);
    try {
      const cities: City[] = await apiManager.getGeocoding<City[]>('direct', {
        q: query,
        limit: 5,
        appid: apiKey,
      });
      setCityData(cities);
    } catch (err) {
      console.error('Error fetching cities:', err);
    } finally {
      setIsSearchLoading(false);
    }
  };

  const fetchWeatherByLocation = async (lat: number, lon: number) => {
    setLoading(true);
    try {
      const data = await apiManager.get<WeatherData>('weather', {
        lat,
        lon,
        appid: apiKey,
      });

      data.main.temp = kelvinToCelsius(data.main.temp);
      data.main.feels_like = kelvinToCelsius(data.main.feels_like);
      data.main.temp_min = kelvinToCelsius(data.main.temp_min);
      data.main.temp_max = kelvinToCelsius(data.main.temp_max);

      setCurrentLocationData(data);
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
    recentSearches,
    getRecentSearches,
    fetchWeather,
    fetchCities,
    fetchWeatherByLocation,
  };
};

export default useHomeViewModel;
