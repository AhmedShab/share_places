import React, { Component } from 'react';
import {
	View,
	Image,
	Text,
	Dimensions,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import { deletePlace } from '../../store/actions';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

class placeDetail extends Component {
	constructor(props) {
		super(props);
		Dimensions.addEventListener('change', this.updateStyles);

		this.state = {
			viewMode:
				Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
		};
	}

	updateStyles = dims => {
		this.setState({
			viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
		});
	};

	placeDeletedHandler = () => {
		this.props.onDeletePlace(this.props.selectedPlace.key);
		this.props.navigator.pop();
	};

	render() {
		return (
			<View
				style={[
					styles.container,
					this.state.viewMode === 'portrait'
						? styles.portraitContainer
						: styles.landscapeContainer
				]}
			>
				<View style={styles.placeDetailContainer}>
					<View style={styles.subContainer}>
						<Image
							style={styles.placeImage}
							source={this.props.selectedPlace.image}
						/>
					</View>
					<View style={styles.subContainer}>
						<MapView
							provider={PROVIDER_GOOGLE}
							style={styles.map}
							initialRegion={{
								...this.props.selectedPlace.location,
								latitudeDelta: 0.0122,
								longitudeDelta:
									(Dimensions.get('window').width /
										Dimensions.get('window').height) *
									0.0122
							}}
						>
							<Marker
								coordinate={this.props.selectedPlace.location}
							/>
						</MapView>
					</View>
				</View>
				<View style={styles.subContainer}>
					<View>
						<Text style={styles.placeName}>
							{this.props.selectedPlace.name}
						</Text>
					</View>
					<View>
						<TouchableOpacity onPress={this.placeDeletedHandler}>
							<View style={styles.deleteButton}>
								<Icon size={30} name='ios-trash' color='red' />
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onDeletePlace: key => dispatch(deletePlace(key))
	};
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 22
	},
	placeImage: {
		width: '100%',
		height: '100%'
	},
	placeName: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 28
	},
	portraitContainer: {
		flexDirection: 'column'
	},
	landscapeContainer: {
		flexDirection: 'row'
	},
	deleteButton: {
		alignItems: 'center'
	},
	subContainer: {
		flex: 1
	},
	placeDetailContainer: {
		flex: 1
	},
	map: {
		...StyleSheet.absoluteFillObject
	}
});

export default connect(
	null,
	mapDispatchToProps
)(placeDetail);
