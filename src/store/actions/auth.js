import { TRY_AUTH, AUTH_SET_TOKEN } from './actionTypes';
import startTabs from '../../screens/MainTabs/startMainTabs';
import { uiStartLoading, uiStopLoading } from './ui';

export const tryAuth = (authData, authMode) => {
	return async dispatch => {
		dispatch(uiStartLoading());
		const apiKey = 'AIzaSyAQCaEC2_Ton2uNst2CdhmON1fQuABTzMM';
		let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
		if (authMode === 'signup') {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
		}

		try {
			const res = await fetch(url, {
				method: 'POST',
				body: JSON.stringify({
					email: authData.email,
					password: authData.password,
					returnSecureToken: true
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const parsedRes = await res.json();
			dispatch(uiStopLoading());
			if (!parsedRes.idToken) {
				alert('Authentication failed, please try again!');
			} else {
				dispatch(authSetToken(parsedRes.idToken));
				startTabs();
			}
		} catch (err) {
			console.log(err);
			dispatch(uiStopLoading());
			alert('Authentication failed, please try again!');
		}
	};
};

const authSetToken = token => {
	return {
		type: AUTH_SET_TOKEN,
		token
	};
};

export const authGetToken = () => {
	return (dispatch, getState) => {
		const promise = new Promise((resolve, reject) => {
			const { token } = getState().auth;

			if (!token) {
				reject();
			} else {
				resolve(token);
			}
		});

		return promise;
	};
};
