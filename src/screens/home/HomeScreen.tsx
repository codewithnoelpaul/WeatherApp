import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Button, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import useHomeViewModel from './HomeViewModel';
import {styles} from './HomeStyles';

const HomeScreen: React.FC = () => {
  const {weatherData, loading, error, fetchWeather} = useHomeViewModel();
  const [city, setCity] = useState<string>('San Francisco');

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const iconUrl = weatherData?.weather[0]?.icon
    ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    : null;

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.cityText}>City: {weatherData.name}</Text>
          <Text style={styles.tempText}>
            Temperature: {weatherData.main.temp}°C
          </Text>

          {iconUrl && (
            <FastImage
              style={styles.weatherIcon}
              source={{
                uri: iconUrl,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
        </View>
      )}
      <Button title="Reload Weather" onPress={() => fetchWeather(city)} />
    </View>
  );
};

export default HomeScreen;
