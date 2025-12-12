// Main component
import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type CalendarProps = {
  availableDays?: Date[];
  selectedDate?: Date | null;
  onDatePress?: (date: Date) => void;
};

export function chunkArray<T>(
  items: T[],
  chunkSize: number,
  filler?: T | null
): T[][] {
  const chunks: T[][] = [];

  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    if (filler !== undefined && chunk.length < chunkSize) {
      while (chunk.length < chunkSize) {
        chunk.push(filler as T);
      }
    }
    chunks.push(chunk);
  }

  return chunks;
}

const RNCalendar: React.FC<CalendarProps> = ({
  availableDays = [],
  selectedDate,
  onDatePress,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfWeek = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const calendarDays: (Date | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    );
  }

  const renderCalendarDay = (date: Date | null, index: number) => {
    if (!date) return <View key={index} style={{ width: 44, height: 44 }} />;

    const today = new Date();

    const isPast =
      date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const isToday = date.toDateString() === today.toDateString();
    const isSelected =
      selectedDate && date.toDateString() === selectedDate.toDateString();

    const canPress = !isPast;

    const getDateStyle = () => {
      if (isSelected) {
        return { backgroundColor: '#34755E', color: 'white' };
      } else if (isPast) {
        return { backgroundColor: 'transparent', color: '#C7C7C7' };
      } else if (isToday) {
        return { backgroundColor: '#EEF7F4', color: '#34755E' };
      } else {
        return { backgroundColor: '#fff', color: '#000' };
      }
    };

    const dateStyle = getDateStyle();

    return (
      <TouchableOpacity
        key={index}
        style={{
          width: 44,
          height: 44,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 22,
          backgroundColor: dateStyle.backgroundColor,
          opacity: canPress ? 1 : 0.5,
        }}
        onPress={() => canPress && onDatePress?.(date)}
        disabled={!canPress}
      >
        <Text
          style={{ color: dateStyle.color, fontSize: 17 }}
        >
          {date.getDate()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container]}>
      {/* Header */}
      <View style={[styles.header]}>
        <Text style={{ fontSize: 16 }}>
          {currentMonth.toLocaleString('default', { month: 'long' })}{' '}
          {currentMonth.getFullYear()}
        </Text>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <TouchableOpacity onPress={() => handleMonthChange('prev')}>
            <MaterialCommunityIcons
              name='chevron-left'
              size={24}
              color='#34755E'
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleMonthChange('next')}>
            <MaterialCommunityIcons
              name='chevron-right'
              size={24}
              color='#34755E'
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Week Days */}
      <View style={[styles.weekDays]}>
        {weekDays.map((day, index) => (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              display: "flex"
            }}
            key={index}
          >
            <Text
              style={{
                fontSize: 12,
                color: "#626262"
              }}
            >
              {day}
            </Text>
          </View>
        ))}
      </View>

      {/* Days Grid */}
      <View style={[styles.daysGrid]}>
        {chunkArray(calendarDays, 7, null).map((dateChunk, chunkIndex) => (
          <View
            key={chunkIndex}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              marginTop: 4
            }}
          >
            {dateChunk.map((date, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {renderCalendarDay(date, index)}
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 20,
    borderColor: "#333333",
    borderWidth: 0.3,
    backgroundColor: "#ffffff"
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24
  },
  weekDays: {
    display: 'flex',
    flexDirection: 'row',
    width: "100%",
    marginBottom: 16,
  },
  daysGrid: {
    marginBottom: 32,
    width: "100%",
  }
});

export default RNCalendar;
