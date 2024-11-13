import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {styles} from './InputStyles';
import {InputProps} from './InputModel';
import {City} from '../../screens/home/HomeModel';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigations';
import SQLite from 'react-native-sqlite-storage';


const Input = ({
  loading,
  data,
  placeholder,
  value,
  onChangeText,
}: InputProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const [inputValue, setInputValue] = useState(value || '');

  const handleBackgroundPress = () => {
    Keyboard.dismiss();
    setIsFocused(false);
  };

  const onCardClick = ({item}: {item: City}) => {
    addDataToDatabase({item})
    navigation.navigate('details', {lat: item.lat, long: item.lon});
    setInputValue('');
  };
  
  const handleChangeText = (text: string) => {
    setInputValue(text);
    onChangeText && onChangeText(text);
  };

  const db = SQLite.openDatabase(
    {
      name: 'searchResults',
      location: 'default',
    },
    () => {
      console.log('Database connected!');
    },
    error => console.log('Database error', error),
  );

  const addDataToDatabase = async ({item}: {item: City}) => {
    // setIsLoading(true);
    let sql =
      'INSERT INTO searchData (lat, long) VALUES (?, ?)';
    let params = [item.lat,item.lon];
    db.executeSql(
      sql,
      params,
      result => {
        // setIsLoading(false);
        // Toast.show({
        //   text1: 'Data Added Successfully.',
        //   position: 'bottom',
        //   visibilityTime: 2000,
        //   bottomOffset: 50,
        // });
        console.log('Data  Added Successfully');
      },
      error => {
        // setIsLoading(false);
        console.log('Add  Data error', error);
      },
    );
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
    <View style={[styles.container, isFocused && styles.backgroundBlur]}>
      <View style={styles.rowView}>
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          value={inputValue}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          // onBlur={handleBlur}
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
