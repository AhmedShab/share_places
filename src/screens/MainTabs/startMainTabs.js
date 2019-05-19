import { Navigation } from 'react-native-navigation';
import { findPlaceScreen, sharePlaceScreen, sideDrawerScreen, sideDrawerToggle } from '../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = async () => {
	const map = await Icon.getImageSource("md-map", 30);
	const share = await Icon.getImageSource("ios-share-alt", 30);
	const menu = await Icon.getImageSource("ios-menu", 30);
	const navigatorButtons = {
		leftButtons: [
			{
				id: sideDrawerToggle,
				icon: menu,
				title: "Menu"
			}
		]
	}

	Navigation.startTabBasedApp({
		tabs: [
			{
				screen: findPlaceScreen,
				label: "Find Place",
				title: "Find Place",
				icon: map,
				navigatorButtons
			},
			{
				screen: sharePlaceScreen,
				label: "Share Place",
				title: "Share Place",
				icon: share,
				navigatorButtons
			}
		],
		drawer: {
			left: {
				screen: sideDrawerScreen
			}
		}
	});
}

export default startTabs;