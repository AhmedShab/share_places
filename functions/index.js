const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const fs = require('fs');
const UUID = require('uuid-v4');

const gcconfig = {
	projectId: 'share-places-bc171',
	keyFilename: 'share-places.json'
};

const { Storage } = require('@google-cloud/storage');

const gcs = new Storage(gcconfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.storeImage = functions.https.onRequest((request, response) => {
	return cors(request, response, () => {
		const body = JSON.parse(request.body);
		const imagePath = '/tmp/uploaded-image.jpg';
		fs.writeFileSync(imagePath, body.image, 'base64', err => {
			console.log(err);
			return response.status(500).json({ error: err });
		});
		const bucket = gcs.bucket('share-places-bc171.appspot.com');
		const uuid = UUID();
		return bucket.upload(
			imagePath,
			{
				uploadType: 'media',
				destination: '/places/' + uuid + '.jpg',
				metadata: {
					metadata: {
						contentType: 'image/jpeg',
						firebaseStorageDownloadTokens: uuid
					}
				}
			},
			(err, file) => {
				if (!err) {
					return response.status(201).json({
						imageUrl:
							'https://firebasestorage.googleapis.com/v0/b/' +
							bucket.name +
							'/o/' +
							encodeURIComponent(file.name) +
							'?alt=media&token=' +
							uuid
					});
				} else {
					console.log(err);
					return response.status(500).json({ error: err });
				}
			}
		);
	});
});
