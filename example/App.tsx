import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import RNCalendar from '@praisecodes/rn-calendar';
import { useState } from 'react';

export default function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <View style={styles.container}>
      <RNCalendar
        selectedDate={selectedDate}
        onDatePress={(date) => { setSelectedDate(date) }}
        selectedDateBg='#ff0000'
        currentDateBg='#ff000021'
        currentDateColor='#000000'
        calendarTextStyle={{
          fontSize: 15,
        }}
        daysTextStyle={{
          fontWeight: 700,
          color: "#333",
        }}
        headerTextStyle={{
          fontWeight: 600,
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
