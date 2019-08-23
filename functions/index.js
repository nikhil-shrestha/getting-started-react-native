const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const fs = require('fs');
const uuid = require('uuid');
const { Storage } = require('@google-cloud/storage');

const gcconfig = {
  projectId: 'rn-course-1566437520068',
  keyFilename: 'rn-course.json'
};

const gcs = new Storage(gcconfig);
admin.initializeApp({
  credential: admin.credential.cert(require('./rn-course.json'))
});

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.storeImage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    if (
      !request.headers.authorization ||
      !request.headers.authorization.startsWith('Bearer ')
    ) {
      console.log('No token present');
      response(403).json({ error: 'Unauthorized' });
      return;
    }
    let idToken;
    idToken = request.headers.authorization.split('Bearer ')[1];
    admin
      .auth()
      .verifyIdToken(idToken)
      // eslint-disable-next-line promise/always-return
      .then(_decodedToken => {
        const body = JSON.parse(request.body);
        fs.writeFileSync(
          '/tmp/uploaded-image.jpg',
          body.image,
          'base64',
          err => {
            console.log(err);
            return response.status(500).json({ error: err });
          }
        );
        const bucket = gcs.bucket('rn-course-1566437520068.appspot.com');

        const uKey = uuid.v4();

        bucket.upload(
          '/tmp/uploaded-image.jpg',
          {
            uploadType: 'media',
            destination: '/places/' + uKey + '.jpg',
            metadata: {
              metadata: {
                contentType: 'image/jpeg',
                firebaseStorageDownloadTokens: uKey
              }
            }
          },
          (err, file) => {
            if (!err) {
              response.status(201).json({
                imageUrl:
                  'https://firebasestorage.googleapis.com/v0/b/' +
                  bucket.name +
                  '/o/' +
                  encodeURIComponent(file.name) +
                  '?alt=media&token=' +
                  uKey,
                imagePath: '/places/' + uKey + '.jpg'
              });
            } else {
              console.log(err);
              response.status(500).json({ error: err });
            }
          }
        );
      })
      .catch(_err => {
        console.log('Token is invalid');
        response.status(403).json({ error: 'Unauthorized' });
      });
  });
});

exports.deleteImage = functions.database
  .ref('/places/{placeId}')
  .onDelete(event => {
    const placeData = event.data.previous.val();
    const imagePath = placeData.imagePath;

    const bucket = gcs.bucket('rn-course-1566437520068.appspot.com');
    return bucket.file(imagePath).delete();
  });
