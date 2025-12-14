// Main component
import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import { RNCalendarProps } from './types';

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

const RNCalendar: React.FC<RNCalendarProps> = (props) => {
  const {
    selectedDate,
    onDatePress,
    selectedDateColor,
    selectedDateBg,
    currentDateBg,
    currentDateColor,
    color,
    dateBg,
    calendarTextStyle,
    daysTextStyle,
    headerTextStyle,
    daysStyle,
  } = props;

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
    if (!date) return <View key={index} style={{ width: daysStyle?.width ?? 40, height: daysStyle?.height ?? 40 }} />;

    const today = new Date();

    const isPast =
      date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const isToday = date.toDateString() === today.toDateString();
    const isSelected =
      !!selectedDate ? (date.toDateString() === selectedDate.toDateString()) : (date.toDateString() === new Date().toDateString());

    const canPress = !isPast;

    const getDateStyle = () => {
      if (isSelected) {
        return { backgroundColor: selectedDateBg || '#34755E', color: selectedDateColor || 'white' };
      } else if (isPast) {
        return { backgroundColor: 'transparent', color: '#C7C7C7' };
      } else if (isToday) {
        return { backgroundColor: currentDateBg || '#EEF7F4', color: currentDateColor || '#34755E' };
      } else {
        return { backgroundColor: dateBg || '#fff', color: color || '#000' };
      }
    };

    const dateStyle = getDateStyle();

    return (
      <TouchableOpacity
        key={index}
        style={{
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 22,
          backgroundColor: dateStyle.backgroundColor,
          opacity: canPress ? 1 : 0.5,
          ...daysStyle
        }}
        onPress={() => canPress && onDatePress?.(date)}
        disabled={!canPress}
      >
        <Text
          style={{
            color: dateStyle.color,
            fontSize: 17,
            ...calendarTextStyle,
          }}
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
        <Text
          style={{
            fontSize: 16,
            ...headerTextStyle
          }}
        >
          {currentMonth.toLocaleString('default', { month: 'long' })}{' '}
          {currentMonth.getFullYear()}
        </Text>

        <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
          <TouchableOpacity onPress={() => handleMonthChange('prev')}>
            <View style={[styles.monthSwitchBtn]}>
              <Image
                source={require("./assets/angle.png")}
                style={{
                  width: 20,
                  height: 20
                }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleMonthChange('next')}>
            <View style={[styles.monthSwitchBtn]}>
              <Image
                source={require("./assets/angle.png")}
                style={{
                  width: 20,
                  height: 20,
                  transform: [{ rotate: "180deg" }]
                }}
              />
            </View>
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
                color: "#626262",
                ...daysTextStyle,
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
    paddingHorizontal: 16,
    paddingVertical: 10,
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
    marginBottom: 16
  },
  weekDays: {
    display: 'flex',
    flexDirection: 'row',
    width: "100%",
    marginBottom: 16,
  },
  daysGrid: {
    width: "100%",
  },
  monthSwitchBtn: {
    width: 30,
    height: 30,
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  }
});

export default RNCalendar;
