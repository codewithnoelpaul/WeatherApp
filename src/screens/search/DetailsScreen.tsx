import React, {useEffect, useState} from 'react';
import {View, Text, Button, SafeAreaView, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {styles} from './DetailsStyles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigations';
import {Strings} from '../../constants/Strings';

const DetailsScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyView}>
        <FastImage
          style={styles.weatherIcon}
          source={{
            uri: 'https://openweathermap.org/img/wn/10d@4x.png',
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.cityText}>City</Text>
        <Text style={styles.tempText}>40</Text>
        <View style={styles.detailsCard}>
          <View style={styles.detailsCardRow}>
            <Text style={styles.detailsCardOption}>{Strings.en.pressure}</Text>
            <Text style={styles.detailsCardDescription}>2000</Text>
          </View>
          <View style={styles.detailsCardRow}>
            <Text style={styles.detailsCardOption}>{Strings.en.pressure}</Text>
            <Text style={styles.detailsCardDescription}>2000</Text>
          </View>
          <View style={styles.detailsCardRow}>
            <Text style={styles.detailsCardOption}>{Strings.en.seaLevel}</Text>
            <Text style={styles.detailsCardDescription}>2000</Text>
          </View>
          <View style={styles.detailsCardRow}>
            <Text style={styles.detailsCardOption}>{Strings.en.tempMax}</Text>
            <Text style={styles.detailsCardDescription}>2000</Text>
          </View>
          <View style={styles.detailsCardRow}>
            <Text style={styles.detailsCardOption}>{Strings.en.tempMin}</Text>
            <Text style={styles.detailsCardDescription}>2000</Text>
          </View>
          <View style={styles.detailsCardRow}>
            <Text style={styles.detailsCardOption}>
              {Strings.en.visibility}
            </Text>
            <Text style={styles.detailsCardDescription}>2000</Text>
          </View>
          <View style={styles.detailsCardRow}>
            <Text style={styles.detailsCardOption}>{Strings.en.windDeg}</Text>
            <Text style={styles.detailsCardDescription}>2000</Text>
          </View>
          <View style={styles.detailsCardRow}>
            <Text style={styles.detailsCardOption}>{Strings.en.windspeed}</Text>
            <Text style={styles.detailsCardDescription}>2000</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailsScreen;
