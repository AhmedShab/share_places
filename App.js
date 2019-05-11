import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth'

const authScreen = "share-places.AuthScreen";

// Register screens
Navigation.registerComponent(authScreen, () => AuthScreen);

// Start an App
Navigation.startSingleScreenApp({
  screen: {
    screen: authScreen,
    title: "Login"
  }
})