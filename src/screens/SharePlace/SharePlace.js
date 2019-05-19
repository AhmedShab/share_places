import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { addPlace } from '../../store/actions';

import PlaceInput from '../../components/PlaceInput/PlaceInput';
import { sideDrawerToggle } from '../../../constants';

class SharePlaceScreen extends Component {
	constructor(props) {
	  super(props);
	  props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
	}

	onNavigatorEvent = event => {
		if (event.type === "NavBarButtonPress") {
			if(event.id === sideDrawerToggle) {
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