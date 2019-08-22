const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const fs = require('fs');
const uuid = require('uuid');
const { Storage } = require('@google-cloud/storage');

const gcconfig = {
  projectId: 'rn-course-1566437520068',
  keyFilename: 'rn-course.json'
};

const gcs = new Storage(gcconfig);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.storeImage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const body = JSON.parse(request.body);
    fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64', err => {
      console.log(err);
      return response.status(500).json({ error: err });
    });
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
              uKey
          });
        } else {
          console.log(err);
          response.status(500).json({ error: err });
        }
      }
    );
  });
});
