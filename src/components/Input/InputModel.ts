import {TextInputProps} from 'react-native';
import {City} from '../../screens/home/HomeModel';

export interface InputProps {
  loading:boolean
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  data?: City[];
}
