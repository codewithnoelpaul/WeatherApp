import {Colors} from '../../constants/Colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.transparentWhite90,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 9999,
  },
  title: {
    color: '#646D82',
    marginTop: 18,
    fontSize: 14,
    fontWeight: '400',
  },
});
