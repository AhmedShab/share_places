import { ADD_PLACE, DELETE_PLACE } from './actionTypes';
const baseUrl = 'https://share-places-bc171.firebaseio.com/';

export const addPlace = (placeName, location, image) => {
	const placeData = {
		name: placeName,
		location
	};
	return dispatch => {
		fetch(`${baseUrl}/places.json`, {
			method: 'post',
			body: JSON.stringify(placeData)
		})
			.catch(err => console.log(err))
			.then(res => res.json())
			.then(parsedRes => {
				console.log(parsedRes);
			});
	};
};

export const deletePlace = key => {
	return {
		type: DELETE_PLACE,
		placeKey: key
	};
};
