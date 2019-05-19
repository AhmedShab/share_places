import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import startTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';

class AuthScreen extends Component {
	loginHandler = () => {
		startTabs();
	}
	render() {
		return (
			<View style={styles.conatiner}>
				<Text>Please log in</Text>
				<Button title="Switch to Login" />
				<View style={styles.inputContainer}>
					<DefaultInput placeholder="Your e-Mail Address" />
					<DefaultInput placeholder="Password" />
					<DefaultInput placeholder="confirm Password" />
				</View>
				<Button title="Submit" onPress={this.loginHandler} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	conatiner: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	inputContainer: {
		width: "80%",
	}
})

export default AuthScreen;