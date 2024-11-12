import React, {useEffect, useState} from 'react';
import {View, Text, Button, SafeAreaView} from 'react-native';
import FastImage from 'react-native-fast-image';
import useHomeViewModel from './HomeViewModel';
import {styles} from './HomeStyles';
import Input from '../../components/Input/Input';
import {Strings} from '../../constants/Strings';
import {Colors} from '../../constants/Colors';

const HomeScreen: React.FC = () => {
  const {weatherData, loading, error, fetchWeather} = useHomeViewModel();
  const [searchKey, setSearchKey] = useState<string>('');
  const [city, setCity] = useState<string>('San Francisco');

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const iconUrl = weatherData?.weather[0]?.icon
    ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    : null;

  const onChangeText = (text: string) => {
    searchKey(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Input
          placeholder={Strings.en.searchPlaceholder}
          onChangeText={onChangeText}
        />
      </View>
      <View style={styles.bodyView}>
        <View style={styles.currentLocationCardContainer}>
          {weatherData && (
            <>
              <View style={styles.rowViewTop}>
                <Text style={styles.tempText}>{weatherData.main.temp}°</Text>
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
              <View style={styles.rowViewBottom}>
                <Text style={styles.cityText}>{weatherData.name}</Text>
                <Text style={styles.climateText}>
                  {weatherData.weather[0].description}
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
      <Button title="Reload Weather" onPress={() => fetchWeather(city)} />
    </View>
  );
};

export default HomeScreen;
