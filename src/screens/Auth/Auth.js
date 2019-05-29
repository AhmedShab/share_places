import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	ImageBackground,
	Dimensions,
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback
} from 'react-native';
import startTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import validate from '../../utility/validation';
import { connect } from 'react-redux';
import { tryAuth } from '../../store/actions/auth';

class AuthScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			viewMode:
				Dimensions.get('window').height > 500
					? 'portrait'
					: 'landscape',
			authMode: 'login',
			controls: {
				email: {
					value: '',
					valid: false,
					validationRules: {
						isEmail: true
					},
					touched: false
				},
				password: {
					value: '',
					valid: false,
					validationRules: {
						minLength: 6
					},
					touched: false
				},
				confirmPassword: {
					value: '',
					valid: false,
					validationRules: {
						equalTo: 'password'
					},
					touched: false
				}
			}
		};

		Dimensions.addEventListener('change', this.updateStyles);
	}

	componentWillUnmount() {
		Dimensions.removeEventListener('change', this.updateStyles);
	}

	switchAuthModeHandler = () => {
		this.setState(prevState => {
			return {
				authMode: prevState.authMode === 'login' ? 'signup' : 'login'
			};
		});
	};

	updateStyles = dims => {
		this.setState({
			viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
		});
	};

	componentWillUnmount() {
		Dimensions.removeEventListener('change', this.updateStyles);
	}

	loginHandler = () => {
		const { email, password } = this.state.controls;
		const authData = {
			email: email.valid,
			password: password.value
		};
		this.props.onLogin(authData);
		startTabs();
	};

	updateInputState = (key, value) => {
		let connectedValue = {};
		if (this.state.controls[key].validationRules.equalTo) {
			const equalControl = this.state.controls[key].validationRules
				.equalTo;
			const equalValue = this.state.controls[equalControl].value;
			connectedValue = {
				...connectedValue,
				equalTo: equalValue
			};
		}

		if (key === 'password') {
			connectedValue = {
				...connectedValue,
				equalTo: value
			};
		}

		this.setState(prevState => {
			return {
				controls: {
					...prevState.controls,
					confirmPassword: {
						...prevState.controls.confirmPassword,
						valid:
							key === 'password'
								? validate(
										prevState.controls.confirmPassword
											.value,
										prevState.controls.confirmPassword
											.validationRules,
										connectedValue
								  )
								: prevState.controls.confirmPassword.valid
					},
					[key]: {
						...prevState.controls[key],
						value,
						valid: validate(
							value,
							prevState.controls[key].validationRules,
							connectedValue
						),
						touched: true
					}
				}
			};
		});
	};

	render() {
		let headingText = null;
		let confirmPasswordControl = null;
		const { controls } = this.state;

		if (this.state.authMode === 'signup') {
			confirmPasswordControl = (
				<View
					style={
						this.state.viewMode === 'portrait'
							? styles.portraitPasswordWrapper
							: styles.landscapePasswordWrapper
					}
				>
					<DefaultInput
						style={styles.input}
						placeholder='confirm Password'
						value={controls.confirmPassword.value}
						onChangeText={val =>
							this.updateInputState('confirmPassword', val)
						}
						valid={this.state.controls.confirmPassword.valid}
						touched={this.state.controls.confirmPassword.touched}
						secureTextEntry
					/>
				</View>
			);
		}

		if (this.state.viewMode === 'portrait') {
			headingText = (
				<MainText>
					<HeadingText>Please log in</HeadingText>
				</MainText>
			);
		}
		return (
			<ImageBackground
				style={styles.backgroundImage}
				source={backgroundImage}
			>
				<KeyboardAvoidingView
					style={styles.container}
					behavior='padding'
				>
					{headingText}
					<ButtonWithBackground
						color='#29aaf4'
						onPress={this.switchAuthModeHandler}
					>
						Switch to{' '}
						{this.state.authMode === 'login' ? 'Sign Up' : 'Login'}
					</ButtonWithBackground>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View style={styles.inputContainer}>
							<DefaultInput
								style={styles.input}
								placeholder='Your E-Mail Address'
								value={controls.email.value}
								onChangeText={val =>
									this.updateInputState('email', val)
								}
								valid={this.state.controls.email.valid}
								touched={this.state.controls.email.touched}
								autoCapitalize='none'
								autoCorrect={false}
								keyboard-type='email-address'
							/>
							<View
								style={
									this.state.viewMode === 'portrait' ||
									this.state.authMode === 'login'
										? styles.portraitPasswordContainer
										: styles.landscapePasswordContainer
								}
							>
								<View
									style={
										this.state.viewMode === 'portrait' ||
										this.state.authMode === 'login'
											? styles.portraitPasswordWrapper
											: styles.landscapePasswordWrapper
									}
								>
									<DefaultInput
										style={styles.input}
										placeholder='Password'
										value={controls.password.value}
										onChangeText={val =>
											this.updateInputState(
												'password',
												val
											)
										}
										valid={
											this.state.controls.password.valid
										}
										touched={
											this.state.controls.password.touched
										}
										secureTextEntry
									/>
								</View>
								{confirmPasswordControl}
							</View>
						</View>
					</TouchableWithoutFeedback>
					<ButtonWithBackground
						color='#29aaf4'
						onPress={this.loginHandler}
						disabled={
							(!this.state.controls.email.valid &&
								this.state.authMode === 'signup') ||
							!this.state.controls.password.valid ||
							!this.state.controls.confirmPassword.valid
						}
					>
						Submit
					</ButtonWithBackground>
				</KeyboardAvoidingView>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	backgroundImage: {
		flex: 1,
		width: '100%'
	},
	inputContainer: {
		width: '80%'
	},
	input: {
		backgroundColor: '#eee',
		borderColor: '#bbb'
	},
	landscapePasswordContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	portraitPasswordContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start'
	},
	landscapePasswordWrapper: {
		width: '45%'
	},
	portraitPasswordWrapper: {
		width: '100%'
	}
});

const mapDispatchToProps = dispatch => {
	return {
		onLogin: authData => dispatch(tryAuth(authData))
	};
};

export default connect(
	null,
	mapDispatchToProps
)(AuthScreen);
