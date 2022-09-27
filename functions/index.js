const functions = require("firebase-functions");
const app = require("express")();
const {createAuthToken} = require("./createAuthToken");

app.get("/createAuthToken", createAuthToken);

exports.api = functions.https.onRequest(app);
