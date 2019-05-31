import React, { Component } from 'react';
import {
	View,
	ScrollView,
	Text,
	Button,
	StyleSheet,
	Image
} from 'react-native';
import { connect } from 'react-redux';
import { addPlace } from '../../store/actions';

import { sideDrawerToggle } from '../../../constants';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import validate from '../../utility/validation';

class SharePlaceScreen extends Component {
	static navigatorStyle = {
		navBarButtonColor: 'orange'
	};

	constructor(props) {
		super(props);
		props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
		this.state = {
			controls: {
				placeName: {
					value: '',
					valid: false,
					touched: false,
					validationRules: {
						isNotEmpty: true
					}
				}
			}
		};
	}

	onNavigatorEvent = event => {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === sideDrawerToggle) {
				this.props.navigator.toggleDrawer({
					side: 'left'
				});
			}
		}
	};

	placeAddedHandler = () => {
		if (this.state.controls.placeName.value.trim() !== '') {
			this.props.onAddPlace(this.state.controls.placeName.value);
		}
	};

	placeNameChangeHandler = val => {
		this.setState(prevState => {
			return {
				controls: {
					...prevState.controls,
					placeName: {
						...prevState.controls.placeName,
						value: val,
						touched: true,
						valid: validate(
							val,
							prevState.controls.placeName.validationRules
						)
					}
				}
			};
		});
	};

	render() {
		return (
			<ScrollView>
				<View style={styles.container}>
					<MainText>
						<HeadingText>Share a place with us</HeadingText>
					</MainText>
					<PickImage />
					<PickLocation />
					<PlaceInput
						placeData={this.state.controls.placeName}
						onChangeText={this.placeNameChangeHandler}
					/>
					<View style={styles.button}>
						<Button
							title='Share the place'
							onPress={this.placeAddedHandler}
							disabled={!this.state.controls.placeName.valid}
						/>
					</View>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},
	button: {
		margin: 8
	},
	placeholder: {
		borderWidth: 1,
		borderColor: 'black',
		backgroundColor: '#eee',
		width: '80%',
		height: 150
	},
	previewImage: {
		width: '100%',
		height: '100%'
	}
});

const mapStateToProps = dispatch => {
	return {
		onAddPlace: placeName => dispatch(addPlace(placeName))
	};
};

export default connect(
	null,
	mapStateToProps
)(SharePlaceScreen);
