import React, { Component } from 'react';
import {
	View, ScrollView, Text, Button, StyleSheet, Image
} from 'react-native';
import { connect } from 'react-redux';
import { addPlace } from '../../store/actions';

import { sideDrawerToggle } from '../../../constants';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';

class SharePlaceScreen extends Component {
	constructor(props) {
		super(props);
		props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
	}

	onNavigatorEvent = event => {
		if (event.type === "NavBarButtonPress") {
			if (event.id === sideDrawerToggle) {
				this.props.navigator.toggleDrawer({
					side: "left"
				});
			}
		}

	}

	placeAddedHander = placeName => {
		this.props.onAddPlace(placeName);
	}
	render() {
		return (
			<ScrollView>
				<View style={styles.container}>
					<MainText>
						<HeadingText>Share a place with us</HeadingText>
					</MainText>
					<PickImage />
					<PickLocation />
					<PlaceInput />
					<View style={styles.button}>
						<Button title="Share the place" />
					</View>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center"
	},
	button: {
		margin: 8
	},
	placeholder: {
		borderWidth: 1,
		borderColor: "black",
		backgroundColor: "#eee",
		width: "80%",
		height: 150
	},
	previewImage: {
		width: "100%",
		height: "100%"
	}
})

const mapStateToProps = dispatch => {
	return {
		onAddPlace: (placeName) => dispatch(addPlace(placeName))
	}
}

export default connect(null, mapStateToProps)(SharePlaceScreen);