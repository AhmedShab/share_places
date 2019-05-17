import React, { Component } from 'react'
import { View, Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons'
import { deletePlace } from '../../store/actions';

class placeDetail extends Component {
	placeDeletedHandler = () => {
		this.props.onDeletePlace(this.props.selectedPlace.key);
		this.props.navigator.pop();
	}

	render() {
		return (
			<View style={styles.container} >
				<View>
					<Image style={styles.placeImage} source={this.props.selectedPlace.image} />
					<Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
				</View>
				<View>
					<View style={styles.deleteButton}>
						<TouchableOpacity onPress={this.placeDeletedHandler}>
							<Icon size={30} name="ios-trash" />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onDeletePlace: (key) => dispatch(deletePlace(key))
	}
}

const styles = StyleSheet.create({
	container: {
		margin: 22
	},
	placeImage: {
		width: "100%",
		height: 200
	},
	placeName: {
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 28
	},
	deleteButton: {
		alignItems: "center"
	}
});

export default connect(null, mapDispatchToProps)(placeDetail)
