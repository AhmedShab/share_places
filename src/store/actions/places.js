import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';
const baseUrl = 'https://share-places-bc171.firebaseio.com/';

export const addPlace = (placeName, location, image) => {
	return async dispatch => {
		dispatch(uiStartLoading());
		try {
			const imageRes = await fetch(
				'https://us-central1-share-places-bc171.cloudfunctions.net/storeImage',
				{
					method: 'POST',
					body: JSON.stringify({
						image: image.base64
					})
				}
			);

			const parsedImageRes = await imageRes.json();

			const placeData = {
				name: placeName,
				location,
				image: parsedImageRes.imageUrl
			};

			const placesRes = await fetch(`${baseUrl}/places.json`, {
				method: 'post',
				body: JSON.stringify(placeData)
			});

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
			const res = await fetch(`${baseUrl}/places.json`);
			const parsedRes = res.json();

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
			console.log(err);
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
			await fetch(`${baseUrl}/places/${key}.json`, {
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
