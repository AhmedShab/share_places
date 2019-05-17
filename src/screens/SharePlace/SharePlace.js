import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { addPlace } from '../../store/actions';

import PlaceInput from '../../components/PlaceInput/PlaceInput';

class SharePlaceScreen extends Component {
	placeAddedHander = placeName => {
		this.props.onAddPlace(placeName);
	}
	render() {
		return (
			<View>
				<PlaceInput onPlaceAdded={this.placeAddedHander} />
			</View>
		)
	}
}

const mapStateToProps = dispatch => {
	return {
		onAddPlace: (placeName) => dispatch(addPlace(placeName))
	}
}

export default connect(null, mapStateToProps)(SharePlaceScreen);