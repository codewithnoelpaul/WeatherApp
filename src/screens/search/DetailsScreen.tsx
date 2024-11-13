import React, {useEffect, useState} from 'react';
import {View, Text, Button, SafeAreaView, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {styles} from './DetailsStyles';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigations';
import {Strings} from '../../constants/Strings';
import useDetailsViewModel from './DetailsViewModel';
import Loader from '../../components/Loader/Loader';

const DetailsScreen: React.FC = ({}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'details'>>();
  const {weatherData, loading, fetchWeatherByLocation} = useDetailsViewModel();

  useEffect(() => {
    console.log('DetailScreen -',route.params );
    
    fetchWeatherByLocation(route.params.lat, route.params.long);
  }, [route]);

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader isVisible={loading} />
      <View style={styles.bodyView}>
        <FastImage
          style={styles.weatherIcon}
          source={{
            uri: `https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@4x.png`,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.cityText}>{weatherData?.name}</Text>
        <Text style={styles.tempText}>{weatherData?.main.temp}</Text>
        <View style={styles.detailsCard}>
          <View style={styles.detailsCardRow}>
            <Text style={styles.detailsCardOption}>{Strings.en.pressure}</Text>
            <Text style={styles.detailsCardDescription}>
              {weatherData?.main.pressure}
            </Text>
          </View>
          <View style={styles.detailsCardRow}>
            <Text style={styles.detailsCardOption}>{Strings.en.humidity}</Text>
            <Text style={styles.detailsCardDescription}>
              {weatherData?.main.humidity}%
            </Text>
          </View>
          <View style={styles.detailsCardRow}>
            <Text style={styles.detailsCardOption}>{Strings.en.seaLevel}</Text>
            <Text style={styles.detailsCardDescription}>
              {weatherData?.main.sea_level}
            </Text>
          </View>
          <View style={styles.detailsCardRow}>
            <Text style={styles.detailsCardOption}>{Strings.en.tempMax}</Text>
            <Text style={styles.detailsCardDescription}>
              {weatherData?.main.temp_max}
            </Text>
          </View>
          <View style={styles.detailsCardRow}>
            <Text style={styles.detailsCardOption}>{Strings.en.tempMin}</Text>
            <Text style={styles.detailsCardDescription}>
              {weatherData?.main.temp_min}
            </Text>
          </View>
          <View style={styles.detailsCardRow}>
            <Text style={styles.detailsCardOption}>
              {Strings.en.visibility}
            </Text>
            <Text style={styles.detailsCardDescription}>
              {weatherData?.visibility} km
            </Text>
          </View>
          <View style={styles.detailsCardRow}>
            <Text style={styles.detailsCardOption}>{Strings.en.windDeg}</Text>
            <Text style={styles.detailsCardDescription}>
              {weatherData?.wind.deg}
            </Text>
          </View>
          <View style={styles.detailsCardRow}>
            <Text style={styles.detailsCardOption}>{Strings.en.windspeed}</Text>
            <Text style={styles.detailsCardDescription}>
              {weatherData?.wind.speed}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailsScreen;
