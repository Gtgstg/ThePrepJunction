const { Storage } = require('@google-cloud/storage');

const storage = new Storage();
const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

// Service functions for interacting with Google Cloud Storage here

module.exports = {
  storage,
  bucket,
};