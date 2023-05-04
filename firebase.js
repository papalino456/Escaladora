const admin = require("firebase-admin");
const path = require("path");
// Replace this with the path to your service account key file
const serviceAccountKeyPath = require(path.resolve(__dirname, "escaladora-7a02c-firebase-adminsdk-vzcfq-88e46abb90.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKeyPath),
});

const db = admin.firestore();

module.exports = db;