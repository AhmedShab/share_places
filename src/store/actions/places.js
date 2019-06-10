import { ADD_PLACE, DELETE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';
const baseUrl = 'https://share-places-bc171.firebaseio.com/';

export const addPlace = (placeName, location, image) => {
	return dispatch => {
		dispatch(uiStartLoading());
		fetch(
			'https://us-central1-share-places-bc171.cloudfunctions.net/storeImage',
			{
				method: 'POST',
				body: JSON.stringify({
					image: image.base64
				})
			}
		)
			.catch(err => {
				console.log(err);
				alert('Something went wrong, please try again!');
				dispatch(uiStopLoading());
			})
			.then(res => res.json())
			.then(parsedRes => {
				const placeData = {
					name: placeName,
					location,
					image: parsedRes.imageUrl
				};
				fetch(`${baseUrl}/places.json`, {
					method: 'post',
					body: JSON.stringify(placeData)
				})
					.catch(err => {
						console.log(err);
						alert('Something went wrong, please try again!');
						dispatch(uiStopLoading());
					})
					.then(res => res.json())
					.then(parsedRes => {
						console.log(parsedRes);
						dispatch(uiStopLoading());
					});
			});
	};
};

export const deletePlace = key => {
	return {
		type: DELETE_PLACE,
		placeKey: key
	};
};
