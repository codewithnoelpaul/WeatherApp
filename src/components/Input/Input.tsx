import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {styles} from './InputStyles';
import {InputProps} from './InputModel';
import {City} from '../../screens/home/HomeModel';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigations';
import useInputViewModel from './InputViewModel';

const Input = ({
  loading,
  data,
  placeholder,
  value,
  onChangeText,
}: InputProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {isDbLoading, saveSearch} = useInputViewModel();
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const [inputValue, setInputValue] = useState(value || '');

  const onCardClick = ({item}: {item: City}) => {
    saveSearch({latitude: item.lat, longitude: item.lon});
    navigation.navigate('details', {lat: item.lat, long: item.lon});
    setInputValue('');
  };

  const handleChangeText = (text: string) => {
    setInputValue(text);
    onChangeText && onChangeText(text);
  };

  const renderDropdownItem = ({item}: {item: City}) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => {
        onCardClick({item});
      }}>
      <Text>{`${item.name}, ${item.state ? item.state + ', ' : ''}${
        item.country
      }`}</Text>
    </TouchableOpacity>
  );

  const renderEmptyResults = () => (
    <View>
      {inputValue?.length >= 3 && (
        <Text style={styles.noResultsText}>No results found</Text>
      )}
    </View>
  );

  return (
    <View style={[styles.container]}>
      <View style={styles.rowView}>
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          value={inputValue}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          returnKeyType="done"
          blurOnSubmit
        />
        {loading && <ActivityIndicator size="small" />}
      </View>
      {isFocused && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={inputValue?.length > 2 ? data : []}
            renderItem={renderDropdownItem}
            ListEmptyComponent={renderEmptyResults}
            keyExtractor={item => `${item.lat}-${item.lon}`}
            style={styles.dropdownList}
          />
        </View>
      )}
    </View>
  );
};

export default Input;
