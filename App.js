import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth'
import SharePlaceScreen from './src/screens/SharePlace/SharePlace'
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailsScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';
import { authScreen, findPlaceScreen, sharePlaceScreen, placeDetailsScreen, sideDrawerScreen } from './constants';
import configureStore from './src/store/configureStore';


const store = configureStore();

// Register screens
Navigation.registerComponent(authScreen, () => AuthScreen, store, Provider);
Navigation.registerComponent(sharePlaceScreen, () => SharePlaceScreen, store, Provider);
Navigation.registerComponent(findPlaceScreen, () => FindPlaceScreen, store, Provider);
Navigation.registerComponent(placeDetailsScreen, () => PlaceDetailsScreen, store, Provider);
Navigation.registerComponent(sideDrawerScreen, () => SideDrawer);

// Start an App
Navigation.startSingleScreenApp({
	screen: {
		screen: authScreen,
		title: "Login"
	}
})