# RNCalendar

A modern, customizable calendar component for **React Native** applications. RNCalendar is designed to be flexible, lightweight, and easy to integrate into both **Expo** and **React Native CLI** projects.

It allows you to fully customize **colors**, **fonts**, and basic behaviors while keeping a clean and predictable API.

---

## ✨ Features

* 📅 Clean and intuitive calendar UI
* 🎨 Fully customizable colors
* 🔤 Custom font support
* ⚡ Optimized for performance
* 📱 Works with Expo & React Native CLI
* 🧩 Easy to integrate and extend

---

## 📦 Installation

Install the package using your preferred package manager:

```bash
npm install @praisecodes/rn-calendar
```

or

```bash
yarn add @praisecodes/rn-calendar
```

> **Peer dependencies**: Make sure `react` and `react-native` are already installed in your project.

---

## 🚀 Basic Usage

```tsx
import { RNCalendar } from '@praisecodes/rn-calendar';

export default function App() {
  return (
    <RNCalendar
      selectedDate={selectedDate}
      onDatePress={(date) => { setSelectedDate(date) }}
    />
  );
}
```

---

## 🎨 Customization

RNCalendar allows you to customize its appearance to match your app’s design.

### Example

```tsx
<Calendar
  selectedDate={new Date()}
  onDateChange={(date) => console.log(date)}
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
```

### Customizable Options

| Property        | Type   | Description         | Required
| --------------- | ------ | ------------------- | ------------
| selectedDateBg  | string | Selected date background| No     |
| currentDateBg   | string | Current date background | No     |
| currentDateColor| string | Current date text color | No     |
| selectedDateColor| string| Selected date text color| No     |
| calendarTextStyle| string| General text style for dates| No |
| daysTextStyle    | string| Text style for days of week | No |
| daysStyle        | string| View style for days of week | No |
| headerTextStyle  | string| Text style for header       | No |

> Exact props may evolve as the package grows.

---

## 🛠️ Platform Support

* ✅ iOS
* ✅ Android
* ✅ Expo

---

## 🧪 Example App

The repository includes an **example Expo app** demonstrating real-world usage and customization.

```bash
cd example
yarn install
yarn start
```

---

## 👨‍💻 Authors

Created and maintained by:

* [**Praise Codes**](https://github.com/Praisecodes)
* [**Williams Bolade**](https://github.com/mach98)

---

## 📄 License

[MIT License © 2025](https://github.com/Praisecodes/rn-calendar/blob/main/LICENSE)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

If you’d like to contribute:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## ⭐ Support

If you find RNCalendar useful, consider giving it a ⭐ on GitHub. Your support helps the project grow.
