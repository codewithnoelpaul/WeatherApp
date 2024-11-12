import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import useHomeViewModel from './HomeViewModel';
import {styles} from './HomeStyles';
import Input from '../../components/Input/Input';
import {Strings} from '../../constants/Strings';
import {Colors} from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigations';

const HomeScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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

  const onCard = () => {
    navigation.navigate('details');
  };
  const renderRecentSearches = () => {
    return (
      <TouchableOpacity style={styles.recentSearchCard} onPress={onCard}>
        <View style={styles.cardRowViewTop}>
          <Text style={styles.cardCityText}>{weatherData?.name}</Text>
          <Text style={styles.cardTempText}>{weatherData?.main?.temp}°</Text>
        </View>
        <View style={styles.cardRowViewBottom}>
          <Text style={styles.cardDescriptionText}>
            {weatherData?.weather[0].description}
          </Text>
          <Text style={styles.cardDescriptionText}>
            H:{weatherData?.main?.temp_max}° L:{weatherData?.main?.temp_min}°
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyRecentSearches = () => (
    <Text style={styles.noRecentSearches}>{Strings.en.noRecentSearches}</Text>
  );

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
          <Text style={styles.currentLocationText}>
            {Strings.en.yourLocation}
          </Text>
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
        <Text style={styles.recentSearchesText}>
          {Strings.en.recentSearches}
        </Text>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          renderItem={renderRecentSearches}
          ListEmptyComponent={renderEmptyRecentSearches}
          style={styles.flatList}
          contentContainerStyle={styles.flatListContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
