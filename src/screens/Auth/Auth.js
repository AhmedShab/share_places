import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import startTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';

class AuthScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			styles: {
				pwContainerDirection: "column",
				pwContainerJustifyContent: "flex-start",
				pwWrapperWidth: "100%"
			}
		}

		Dimensions.addEventListener('change', e => {
			this.setState({
				styles: {
					pwContainerDirection: Dimensions.get("window").height > 500 ? "column" : "row",
					pwContainerJustifyContent: Dimensions.get("window").height > 500 ? "flex-start" : "space-between",
					pwWrapperWidth: Dimensions.get("window").height > 500 ? "100%" : "45%"
				}
			})
		})
	}

	loginHandler = () => {
		startTabs();
	}
	render() {
		let headingText = null;

		if (Dimensions.get("window").height > 500) {
			<MainText>
				<HeadingText>Please log in</HeadingText>
			</MainText>
		}
		return (
			<ImageBackground style={styles.backgroundImage} source={backgroundImage}>
				<View style={styles.container}>
					{headingText}
					<ButtonWithBackground color="#29aaf4">Switch to Login</ButtonWithBackground>
					<View style={styles.inputContainer}>
						<DefaultInput style={styles.input} placeholder="Your e-Mail Address" />
						<View
							style={{
								flexDirection: this.state.styles.pwContainerDirection,
								justifyContent: this.state.styles.pwContainerJustifyContent
							}}>
							<View
								style={{
									width: this.state.styles.pwWrapperWidth
								}}>
								<DefaultInput style={styles.input} placeholder="Password" />
							</View>
							<View
								style={{
									width: this.state.styles.pwWrapperWidth
								}}>
								<DefaultInput style={styles.input} placeholder="confirm Password" />
							</View>
						</View>
					</View>
					<ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>Submit</ButtonWithBackground>
				</View>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	container: {
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