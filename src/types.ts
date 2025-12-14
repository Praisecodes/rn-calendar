import { TextStyle } from "react-native";

export type RNCalendarProps = {
  selectedDate?: Date | null;
  onDatePress?: (date: Date) => void;
  selectedDateColor?: string;
  selectedDateBg?: string;
  currentDateBg?: string;
  currentDateColor?: string;
  color?: string;
  dateBg?: string;
  calendarTextStyle?: TextStyle;
  daysTextStyle?: TextStyle;
  headerTextStyle?: TextStyle;
}
