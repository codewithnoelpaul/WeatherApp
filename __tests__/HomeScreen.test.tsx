import React from 'react';
import {beforeEach, describe, expect, jest, test} from '@jest/globals';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import HomeScreen from '../src/screens/home/HomeScreen';
import useHomeViewModel from '../src/screens/home/HomeViewModel';
import {useIsFocused, useNavigation} from '@react-navigation/native';

// Mock ViewModel and Navigation
jest.mock('../src/screens/home/HomeViewModel');
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useIsFocused: jest.fn(), 
}));
jest.mock('react-native-geolocation-service');
jest.mock('react-native-sqlite-storage', () => ({
    openDatabase: jest.fn(() => ({
      transaction: jest.fn(),
      executeSql: jest.fn(() => Promise.resolve([])),
    })),
  }));

const mockUseHomeViewModel = useHomeViewModel as jest.Mock;
const mockNavigation = useNavigation as jest.Mock;
const mockIsFocused = useIsFocused as jest.Mock;

// Set up mock data
beforeEach(() => {
  mockUseHomeViewModel.mockReturnValue({
    weatherData: {weather: [{icon: '01d'}], main: {temp: 20}},
    cityData: [{name: 'San Francisco'}],
    currentLocationData: {
      name: 'San Francisco',
      main: {temp: 22},
      weather: [{description: 'Clear'}],
    },
    recentSearches: [
      {
        name: 'San Francisco',
        main: {temp: 22},
        weather: [{description: 'Clear'}],
      },
    ],
    loading: false,
    isSearchLoading: false,
    error: null,
    getRecentSearches: jest.fn(),
    fetchWeather: jest.fn(),
    fetchCities: jest.fn(),
    fetchWeatherByLocation: jest.fn(),
  });

  mockNavigation.mockReturnValue({
    navigate: jest.fn(),
  });
  
});

describe('HomeScreen Component', () => {

  test('renders location card when location data is available', () => {
    const {getByText} = render(<HomeScreen />);
    expect(getByText('Your Location')).toBeTruthy();
  });


  test('renders recent searches correctly', () => {
    const {getByText} = render(<HomeScreen />);
    expect(getByText('Recent Searches')).toBeTruthy();
  });


  test('displays empty state when no recent searches', () => {
    mockUseHomeViewModel.mockReturnValueOnce({
      ...mockUseHomeViewModel(),
      recentSearches: [],
    });

    const {getByText} = render(<HomeScreen />);
    expect(getByText('No Recent Searches')).toBeTruthy();
  });

  test('Calls recentSearch API on mount', () => {
    render(<HomeScreen />);
    expect(mockUseHomeViewModel().getRecentSearches).toHaveBeenCalled();
  });
});
