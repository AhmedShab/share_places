import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth'
import SharePlaceScreen from './src/screens/SharePlace/SharePlace'
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import { authScreen, findPlaceScreen, sharePlaceScreen } from './constants';
import configureStore from './src/store/configureStore';


const store = configureStore();

// Register screens
Navigation.registerComponent(authScreen, () => AuthScreen, store, Provider);
Navigation.registerComponent(sharePlaceScreen, () => SharePlaceScreen, store, Provider);
Navigation.registerComponent(findPlaceScreen, () => FindPlaceScreen, store, Provider);

// Start an App
Navigation.startSingleScreenApp({
	screen: {
		screen: authScreen,
		title: "Login"
	}
})