import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: Colors.white,
    borderColor: Colors.fontGray,
  },
  input: {
    width: '90%',
    height: 40,
    paddingHorizontal: 10,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 45,
    width: '100%',
    backgroundColor: Colors.white,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
    zIndex: 100,
  },
  dropdownText: {
    padding: 10,
    color: '#777',
  },
  dropdownList: {
    maxHeight: 150,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  noResultsText: {
    paddingVertical: 10,
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.jet,
  },
});
