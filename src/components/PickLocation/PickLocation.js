import React, { Component } from 'react';
import { View, Button, StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

class PickLocation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			focusedLocation: {
				latitude: 37.7900352,
				longitude: -122.4013726,
				latitudeDelta: 0.0122,
				longitudeDelta:
					(Dimensions.get('window').width /
						Dimensions.get('window').height) *
					0.0122
			},
			locationChosen: false
		};
	}

	pickLocationHandler = event => {
		const coords = event.nativeEvent.coordinate;
		this.setState(prevState => {
			return {
				focusedLocation: {
					...prevState.focusedLocation,
					latitude: coords.latitude,
					longitude: coords.longitude
				},
				locationChosen: true
			};
		});
	};

	render() {
		let marker = null;

		if (this.state.locationChosen) {
			marker = <Marker coordinate={this.state.focusedLocation} />;
		}
		return (
			<View style={styles.container}>
				<MapView
					provider={PROVIDER_GOOGLE}
					style={styles.map}
					initialRegion={this.state.focusedLocation}
					region={this.state.focusedLocation}
					onPress={this.pickLocationHandler}
				>
					{marker}
				</MapView>
				<View style={styles.button}>
					<Button title='Locate me' />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center'
	},
	button: {
		margin: 8
	},
	map: {
		width: '100%',
		height: 250
	}
});

export default PickLocation;
