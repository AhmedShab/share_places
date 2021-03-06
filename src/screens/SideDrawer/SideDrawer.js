import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class SideDrawer extends Component {
	render() {
		return (
			<View style={[
				styles.container,
				{ width: Dimensions.get("window").width * 0.8 }
			]}>
				<TouchableOpacity>
					<View style={styles.drawerItem}>
						<Icon
							style={styles.drawerItemIcon}
							name="ios-log-out"
							size={30}
							color="#aaa"
						/>
						<Text>Sign out</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
		flex: 1
	},
	drawerItem: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		backgroundColor: "#eee"
	},
	drawerItemIcon: {
		marginRight: 10
	}
})

export default SideDrawer;