import {Colors} from '../../constants/Colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderColor: Colors.fontGray,
    borderWidth: 1,
    height: 44,
    marginTop: 20,
    borderRadius: 8,
    backgroundColor:Colors.white
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    color: Colors.jet,
    fontSize: 14,
    justifyContent: 'center',
  },
  errorText: {
    color: Colors.orange,
    fontSize: 12,
    marginTop: 5,
    paddingHorizontal: 15,
  },
});
