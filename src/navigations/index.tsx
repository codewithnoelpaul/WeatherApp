import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import DetailsScreen from '../screens/search/DetailsScreen';
import {Strings} from '../constants/Strings';
import {City} from '../screens/home/HomeModel';

export type RootStackParamList = {
  home: undefined;
  details: {lat: number; long: number};
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNav = () => {
  return (
    <RootStack.Navigator
      initialRouteName={'home'}
      screenOptions={{headerShown: true}}>
      <RootStack.Screen
        options={{headerShown: false}}
        name={'home'}
        component={HomeScreen}
      />
      <RootStack.Screen
        name={'details'}
        component={DetailsScreen}
        options={{title: Strings.en.cityDetails}}
        initialParams={{lat: 0, long: 0}}
      />
    </RootStack.Navigator>
  );
};

const Navigation = () => {
  return <NavigationContainer>{AppNav()}</NavigationContainer>;
};

export default Navigation;
