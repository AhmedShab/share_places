import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';
import { authGetToken } from './auth';
const baseUrl = 'https://share-places-bc171.firebaseio.com/';

export const addPlace = (placeName, location, image) => {
	return async dispatch => {
		dispatch(uiStartLoading());
		try {
			const token = await dispatch(authGetToken());
			const imageRes = await fetch(
				'http://localhost:5001/share-places-bc171/us-central1/storeImage',
				{
					method: 'POST',
					body: JSON.stringify({
						image: image.base64
					}),
					headers: {
						authorization: `Bearer ${token}`
					}
				}
			);

			const parsedImageRes = await imageRes.json();

			const placeData = {
				name: placeName,
				location,
				image: parsedImageRes.imageUrl
			};

			const placesRes = await fetch(
				`${baseUrl}/places.json?auth=${token}`,
				{
					method: 'post',
					body: JSON.stringify(placeData)
				}
			);

			const parsedPlacesRes = await placesRes.json();

			console.log(parsedPlacesRes);
			dispatch(uiStopLoading());
		} catch (err) {
			console.log(err);
			alert('Something went wrong, please try again!');
			dispatch(uiStopLoading());
		}
	};
};

export const getPlaces = () => {
	return async dispatch => {
		try {
			const token = await dispatch(authGetToken());
			const res = await fetch(`${baseUrl}/places.json?auth=${token}`);
			const parsedRes = await res.json();

			console.log(parsedRes);

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
		} catch (error) {
			alert('Something went wrong, sorry :/');
			console.log(error);
		}
	};
};

export const setPlaces = places => {
	return {
		type: SET_PLACES,
		places
	};
};

export const deletePlace = key => {
	return async dispatch => {
		dispatch(removePlace(key));
		try {
			const token = await dispatch(authGetToken());
			await fetch(`${baseUrl}/places/${key}.json?auth=${token}`, {
				method: 'delete'
			});
		} catch (error) {
			alert('Something went wrong, sorry :/');
			console.log(error);
		}
	};
};

const removePlace = key => {
	return {
		type: REMOVE_PLACE,
		key
	};
};
