const {initializeApp} = require("firebase-admin/app");
const {getAuth} = require("firebase-admin/auth");

exports.app = initializeApp();
exports.auth = getAuth();
