import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  weatherContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  cityText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tempText: {
    fontSize: 16,
    color: 'blue',
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginTop: 8,
  },
});
