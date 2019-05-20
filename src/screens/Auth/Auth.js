import React, { Component } from 'react';
import { View, Button, StyleSheet, ImageBackground } from 'react-native';
import startTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';

class AuthScreen extends Component {
	loginHandler = () => {
		startTabs();
	}
	render() {
		return (
			<ImageBackground style={styles.backgroundImage} source={backgroundImage}>
				<View style={styles.conatiner}>
					<MainText>
						<HeadingText>Please log in</HeadingText>
					</MainText>
					<Button title="Switch to Login" />
					<View style={styles.inputContainer}>
						<DefaultInput style={styles.input} placeholder="Your e-Mail Address" />
						<DefaultInput style={styles.input} placeholder="Password" />
						<DefaultInput style={styles.input} placeholder="confirm Password" />
					</View>
					<Button title="Submit" onPress={this.loginHandler} />
				</View>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	conatiner: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	backgroundImage: {
		flex: 1,
		width: "100%"
	},
	inputContainer: {
		width: "80%",
	},
	input: {
		backgroundColor: "#eee",
		borderColor: "#bbb"
	}
})

export default AuthScreen;