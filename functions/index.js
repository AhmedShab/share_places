const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const fs = require('fs');
const UUID = require('uuid-v4');

const gcconfig = {
	projectId: 'share-places-bc171',
	keyFilename: 'share-places.json'
};

const { Storage } = require('@google-cloud/storage');

const gcs = new Storage(gcconfig);

admin.initializeApp({
	credential: admin.credential.cert(require('./share-places.json'))
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const uploadImage = async imagePath => {
	try {
		const bucket = gcs.bucket('share-places-bc171.appspot.com');
		const uuid = UUID();
		const file = await bucket.upload(imagePath, {
			uploadType: 'media',
			destination: '/places/' + uuid + '.jpg',
			metadata: {
				metadata: {
					contentType: 'image/jpeg',
					firebaseStorageDownloadTokens: uuid
				}
			}
		});
		return {
			imageUrl:
				'https://firebasestorage.googleapis.com/v0/b/' +
				bucket.name +
				'/o/' +
				encodeURIComponent(file[0].name) +
				'?alt=media&token=' +
				uuid
		};
	} catch (err) {
		return console.log(err);
	}
};

exports.storeImage = functions.https.onRequest((request, response) => {
	return cors(request, response, async () => {
		if (
			!request.headers.authorization ||
			!request.headers.authorization.startsWith('Bearer ')
		) {
			console.log('No token found');
			return response.status(403).json({ error: 'Unauthorized' });
		}
		const idToken = request.headers.authorization.split('Bearer ')[1];

		try {
			await admin.auth().verifyIdToken(idToken);
			const body = JSON.parse(request.body);
			const imagePath = '/tmp/uploaded-image.jpg';
			fs.writeFileSync(imagePath, body.image, 'base64', err => {
				console.log(err);
				return response.status(500).json({ error: err });
			});

			return response.status(201).json(await uploadImage(imagePath));
		} catch (error) {
			return response.status(403).json({ error: 'Unauthorized' });
		}
	});
});
