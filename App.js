import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth'
import SharePlaceScreen from './src/screens/SharePlace/SharePlace'
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import { authScreen, findPlaceScreen, sharePlaceScreen } from './constants';


// Register screens
Navigation.registerComponent(authScreen, () => AuthScreen);
Navigation.registerComponent(sharePlaceScreen, () => SharePlaceScreen);
Navigation.registerComponent(findPlaceScreen, () => FindPlaceScreen);

// Start an App
Navigation.startSingleScreenApp({
  screen: {
    screen: authScreen,
    title: "Login"
  }
})