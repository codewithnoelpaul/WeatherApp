import '@testing-library/jest-native/extend-expect';

jest.mock('react-native-permissions', () => {
  return {
    PERMISSIONS: {
      ANDROID: { ACCESS_FINE_LOCATION: 'ACCESS_FINE_LOCATION' },
      IOS: { LOCATION_WHEN_IN_USE: 'LOCATION_WHEN_IN_USE' },
    },
    RESULTS: {
      GRANTED: 'granted',
      DENIED: 'denied',
    },
    request: jest.fn().mockResolvedValue('granted'),
    openSettings: jest.fn(),
  };
});

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: jest.fn(),
}));

jest.mock('react-native-geolocation-service', () => ({
  getCurrentPosition: jest.fn().mockImplementation((successCallback, errorCallback) => {
    const position = {
      coords: {
        latitude: 37.7749,
        longitude: -122.4194,
      },
    };
    successCallback(position);
  }),
}));

jest.mock('react-native-sqlite-storage', () => ({
  openDatabase: jest.fn(() => ({
    transaction: jest.fn(),
    executeSql: jest.fn(),
  })),
}));

