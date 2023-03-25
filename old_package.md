{
  "name": "mobile",
  "version": "1.0.0",
  "scripts": {
    "start": "expo start --dev-client",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "web": "expo start --web",
    "test": "jest --watchAll"
  },
  "jest": {
    "preset": "jest-expo"
  },
  "dependencies": {
    "@expo/vector-icons": "^13.0.0",
    "@react-native-async-storage/async-storage": "1.17.11",
    "@react-navigation/bottom-tabs": "^6.0.5",
    "@react-navigation/drawer": "^6.5.8",
    "@react-navigation/material-top-tabs": "^6.5.1",
    "@react-navigation/native": "^6.0.2",
    "@react-navigation/native-stack": "^6.1.0",
    "axios": "^1.2.2",
    "expo": "^48.0.0",
    "expo-asset": "~8.9.1",
    "expo-constants": "~14.2.1",
    "expo-font": "~11.1.1",
    "expo-image-picker": "~14.1.1",
    "expo-linear-gradient": "~12.1.2",
    "expo-linking": "~4.0.1",
    "expo-splash-screen": "~0.18.1",
    "expo-status-bar": "~1.4.4",
    "expo-system-ui": "~2.2.1",
    "expo-web-browser": "~12.1.1",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-native": "0.70.0",
    "react-native-canvas": "^0.1.38",
    "react-native-mask-text": "^0.13.1",
    "react-native-pager-view": "6.1.2",
    "react-native-reanimated": "~2.14.4",
    "react-native-safe-area-context": "4.5.0",
    "react-native-screens": "~3.20.0",
    "react-native-svg": "13.4.0",
    "react-native-web": "~0.18.11",
    "react-native-webview": "11.26.0",
    "victory-native": "^36.6.8",
    "react-native-gesture-handler": "~2.9.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@types/react": "~18.0.27",
    "@types/react-native": "~0.70.6",
    "jest": "^29.2.1",
    "jest-expo": "^48.0.0",
    "react-test-renderer": "18.1.0",
    "typescript": "^4.9.4"
  },
  "private": true
}