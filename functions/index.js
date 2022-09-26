const functions = require("firebase-functions");
const app = require("express")();
const {createAuthToken} = require("./createAuthToken");

app.post("/createAuthToken", createAuthToken);

exports.api = functions.https.onRequest(app);
