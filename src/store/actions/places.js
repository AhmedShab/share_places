import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
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

export const getPlaces = () => {
	return dispatch => {
		fetch(`${baseUrl}/places.json`)
			.catch(err => {
				alert('Something went wrong, sorry :/');
				console.log(err);
			})
			.then(res => res.json())
			.then(parsedRes => {
				const places = [];
				for (const key in parsedRes) {
					if (parsedRes.hasOwnProperty(key)) {
						places.push({
							...parsedRes[key],
							image: {
								uri: parsedRes[key].image
							},
							key
						});
					}
				}
				dispatch(setPlaces(places));
			});
	};
};

export const setPlaces = places => {
	return {
		type: SET_PLACES,
		places
	};
};

export const deletePlace = key => {
	return dispatch => {
		dispatch(removePlace(key));
		fetch(`${baseUrl}/places/${key}.json`, {
			method: 'delete'
		}).catch(err => {
			alert('Something went wrong, sorry :/');
			console.log(err);
		});
	};
};

const removePlace = key => {
	return {
		type: REMOVE_PLACE,
		key
	};
};
