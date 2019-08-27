import { TRY_AUTH } from './actionTypes';
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
			if (parsedRes.error) {
				alert('Authentication failed, please try again!');
			} else {
				startTabs();
			}
		} catch (err) {
			console.log(err);
			dispatch(uiStopLoading());
			alert('Authentication failed, please try again!');
		}
	};
};
