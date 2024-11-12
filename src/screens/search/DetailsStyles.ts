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
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backButton: {
    marginTop: 20,
    height: 44,
    textAlignVertical: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: Colors.jet,
  },
  weatherIcon: {
    height: 180,
    width: 200,
  },
  cityText: {fontSize: 24, fontWeight: '500', color: Colors.jet},
  tempText: {fontSize: 70, fontWeight: '700', color: Colors.jet},
  detailsCard: {
    marginTop:20,
    width:'100%',
    backgroundColor: Colors.appBg,
    padding: 20,
  },
  detailsCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:5
  },
  detailsCardOption: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.jet,
  },
  detailsCardDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.ebony,
  },
});
