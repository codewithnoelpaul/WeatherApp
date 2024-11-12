import React from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {Colors} from '../../constants/Colors';
import {LoaderModel} from './LoaderModel';
import {styles} from './LoaderStyles';

const Loader = ({isVisible, title}: LoaderModel) => {
  if (!isVisible) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primaryGreen} />
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
};

export default Loader;
