import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
  ListRenderItemInfo,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import useHomeViewModel from './HomeViewModel';
import {styles} from './HomeStyles';
import Input from '../../components/Input/Input';
import {Strings} from '../../constants/Strings';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigations';
import Loader from '../../components/Loader/Loader';
import {
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import {RecentSearch, WeatherCoord, WeatherData} from './HomeModel';

const HomeScreen: React.FC = () => {
  const isFocused = useIsFocused();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    weatherData,
    cityData,
    currentLocationData,
    recentSearches,
    loading,
    isSearchLoading,
    error,
    getRecentSearches,
    fetchWeather,
    fetchCities,
    fetchWeatherByLocation,
  } = useHomeViewModel();
  const [city, setCity] = useState<string>('San Francisco');
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    requestLocationPermission();
    getRecentSearches();
  }, []);

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  useEffect(() => {
    getRecentSearches();
  }, [isFocused]);

  const getIconUrl = (icon: string) => {
    return weatherData?.weather[0]?.icon
      ? `https://openweathermap.org/img/wn/${icon}@2x.png`
      : '';
  };

  const requestLocationPermission = async () => {
    try {
      let permissionResult;
      if (Platform.OS === 'android') {
        permissionResult = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
      } else {
        permissionResult = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      }

      if (permissionResult === RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        Alert.alert(
          'Location Permission',
          'Permission to access location was denied',
        );
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
        fetchWeatherByLocation(latitude, longitude);
      },
      error => {
        console.log('Cannot open app settings -', error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const onChangeText = (text: string) => {
    if (text.length >= 3) {
      fetchCities(text);
    }
  };

  const onCard = (item: WeatherCoord) => {
    navigation.navigate('details', {lat: item.lat, long: item.lon});
  };

  const onSettings = () => {
    openSettings('application').catch(() =>
      console.log('Cannot open app settings'),
    );
  };

  const renderRecentSearches = ({item}: ListRenderItemInfo<WeatherData>) => {
    return (
      <TouchableOpacity
        style={styles.recentSearchCard}
        onPress={() => {
          onCard(item.coord);
        }}>
        <View style={styles.cardRowViewTop}>
          <Text style={styles.cardCityText}>{item?.name}</Text>
          <Text style={styles.cardTempText}>{item?.main?.temp}°</Text>
        </View>
        <View style={styles.cardRowViewBottom}>
          <Text style={styles.cardDescriptionText}>
            {item?.weather[0].description}
          </Text>
          <Text style={styles.cardDescriptionText}>
            H:{item?.main?.temp_max}° L:{item?.main?.temp_min}°
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
        <Text style={styles.tempText}>{currentLocationData?.main.temp}°</Text>
        <FastImage
          style={styles.weatherIcon}
          source={{
            uri: getIconUrl(currentLocationData?.weather[0]?.icon || ''),
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View style={styles.rowViewBottom}>
        <Text style={styles.cityText}>{currentLocationData?.name}</Text>
        <Text style={styles.climateText}>
          {currentLocationData?.weather[0].description}
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
          loading={isSearchLoading}
          data={cityData || []}
          placeholder={Strings.en.searchPlaceholder}
          onChangeText={onChangeText}
        />
      </View>
      <View style={styles.bodyView}>
        <View style={styles.currentLocationCardContainer}>
          <Text style={styles.currentLocationText}>
            {Strings.en.yourLocation}
          </Text>
          {currentLocationData && location
            ? renderLocationCard()
            : renderEmpptyLocationCard()}
        </View>
        <Text style={styles.recentSearchesText}>
          {Strings.en.recentSearches}
        </Text>
        <FlatList
          data={[...recentSearches].reverse()}
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
