import {TextInputProps} from 'react-native';

export interface InputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: TextInputProps['keyboardType'];
  maxLength?: number;
  multiline?: boolean;
}
