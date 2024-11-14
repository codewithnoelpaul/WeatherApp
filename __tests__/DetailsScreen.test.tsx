import React from 'react';
import {beforeEach, describe, expect, jest, test} from '@jest/globals';
import {render} from '@testing-library/react-native';
import DetailsScreen from '../src/screens/search/DetailsScreen';
import useDetailsViewModel from '../src/screens/search/DetailsViewModel';
import {useNavigation, useRoute} from '@react-navigation/native';

jest.mock('../src/screens/search/DetailsViewModel');
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));
jest.mock('react-native-sqlite-storage', () => ({
  openDatabase: jest.fn(() => ({
    transaction: jest.fn(),
    executeSql: jest.fn(() => Promise.resolve([])),
  })),
}));

const mockUseDetailViewModel = useDetailsViewModel as jest.Mock;
const mockNavigation = useNavigation as jest.Mock;
const mockUseRoute = useRoute as jest.Mock;

// Set up mock data
beforeEach(() => {
  mockUseDetailViewModel.mockReturnValue({
    weatherData: {
      weather: [{icon: '01d'}],
      main: {temp: 20, pressure: 1012, humidity: 50},
      wind: {deg: 180, speed: 5},
    },
    loading: false,
    fetchWeatherByLocation: jest.fn(),
  });

  mockNavigation.mockReturnValue({
    navigate: jest.fn(),
  });

  mockUseRoute.mockReturnValue({
    params: {lat: 40.7128, long: -74.006},
  });
});

describe('DetailsScreen Component', () => {
  test('renders Details', () => {
    const {getByText} = render(<DetailsScreen />);
    expect(getByText('Pressure :')).toBeTruthy();
  });

  test('Calls getByLocationApi API on mount', () => {
    render(<DetailsScreen />);
    expect(mockUseDetailViewModel().fetchWeatherByLocation).toHaveBeenCalled();
  });
});
