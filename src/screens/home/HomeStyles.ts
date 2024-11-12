import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerView: {
    backgroundColor: Colors.appBg,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  bodyView: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  currentLocationCardContainer: {
    marginTop: 20,
    backgroundColor: Colors.appBg,
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 20,
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {height: 0, width: 0},
    elevation: 5,
  },
  rowViewTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowViewBottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  tempText: {fontSize: 70, fontWeight: '700', color: Colors.primaryGreen},
  cityText: {fontSize: 18, fontWeight: '500', color: Colors.ebony},
  climateText: {fontSize: 16, fontWeight: '400', color: Colors.ebony},
  weatherIcon: {
    width: 100,
    height: 120,
  },
});
