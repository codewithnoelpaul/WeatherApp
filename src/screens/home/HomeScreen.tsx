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
import Loader from '../../components/Loader/Loader';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';

const HomeScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {weatherData, cityData, loading, error, fetchWeather, fetchCities} =
    useHomeViewModel();
  const [searchKey, setSearchKey] = useState<string>('');
  const [city, setCity] = useState<string>('San Francisco');

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const iconUrl = weatherData?.weather[0]?.icon
    ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    : null;

  const onChangeText = (text: string) => {
    // setSearchKey(text);
    if (text.length >= 3) {
      fetchCities(text);
    }
  };

  const onCard = () => {
    navigation.navigate('details');
  };

  const onSettings = () => {
    // openSettings('application').catch(() => console.warn('Cannot open app settings'));
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

  const renderLocationCard = () => (
    <>
      <View style={styles.rowViewTop}>
        <Text style={styles.tempText}>{weatherData?.main.temp}°</Text>
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
        <Text style={styles.cityText}>{weatherData?.name}</Text>
        <Text style={styles.climateText}>
          {weatherData?.weather[0].description}
        </Text>
      </View>
    </>
  );

  const renderEmpptyLocationCard = () => (
    <>
      <View style={styles.emptyLocationView}>
        <Text style={styles.enableLocationText}>
          {Strings.en.enableLocation}
        </Text>
        <Text
          style={[styles.currentLocationText, {marginTop: 10}]}
          onPress={onSettings}>
          {Strings.en.goToSetting}
        </Text>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Loader isVisible={loading} />
      <View style={styles.headerView}>
        <Input
          data={cityData}
          placeholder={Strings.en.searchPlaceholder}
          onChangeText={onChangeText}
        />
      </View>
      <View style={styles.bodyView}>
        <View style={styles.currentLocationCardContainer}>
          <Text style={styles.currentLocationText}>
            {Strings.en.yourLocation}
          </Text>
          {weatherData ? renderLocationCard() : renderEmpptyLocationCard()}
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
    </SafeAreaView>
  );
};

export default HomeScreen;
