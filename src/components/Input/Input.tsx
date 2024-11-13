import React from 'react';
import {Text, View, TextInput, TextInputProps} from 'react-native';
import {styles} from './InputStyles';
import {InputProps} from './InputModel';

const Input = ({
  data,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  maxLength,
  multiline,
}: InputProps) => {
  return (
    <>
      <View style={[styles.container]}>
        <TextInput
          placeholder={placeholder}
          multiline={multiline}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          maxLength={maxLength}
          returnKeyType="done"
          blurOnSubmit
        />
      </View>
    </>
  );
};

export default Input;
