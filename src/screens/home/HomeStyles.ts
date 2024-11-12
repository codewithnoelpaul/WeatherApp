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
  },
  currentLocationCardContainer: {
    marginTop: 20,
    backgroundColor: Colors.white,
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
  currentLocationText: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.primaryGreen,
  },
  emptyLocationView: {
    padding: 10,
    width: '100%',
  },
  enableLocationText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.ebony,
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
  tempText: {fontSize: 70, fontWeight: '700', color: Colors.jet},
  cityText: {fontSize: 20, fontWeight: '500', color: Colors.ebony},
  climateText: {fontSize: 16, fontWeight: '400', color: Colors.ebony},
  weatherIcon: {
    width: 100,
    height: 120,
  },

  //
  recentSearchesText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primaryGreen,
    marginTop: 20,
    marginBottom: 20,
  },

  flatList: {},
  flatListContainer: {
    paddingBottom: '120%',
  },
  recentSearchCard: {
    marginTop: 10,
    backgroundColor: Colors.appBg,
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  cardRowViewTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  cardRowViewBottom: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  cardCityText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.ebony,
  },
  cardTempText: {
    fontSize: 24,
    fontWeight: '400',
    color: Colors.ebony,
  },
  cardDescriptionText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.ebony,
  },
  noRecentSearches: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.ebony,
    textAlign: 'center',
    marginTop: '50%',
  },
});
