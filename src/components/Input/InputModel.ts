import {TextInputProps} from 'react-native';
import {City} from '../../screens/home/HomeModel';

export interface InputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: TextInputProps['keyboardType'];
  maxLength?: number;
  multiline?: boolean;
  data?: City[];
}
