const functions = require("firebase-functions");
const app = require("express")();
const {createAuthToken} = require("./createAuthToken");
const cors = require("cors")({
  origin: true,
});

// Set up a whitelist and check against it:
const whitelist = ["http://electron-authentication.firebaseapp.com"];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.get("/createAuthToken", createAuthToken);

exports.api = functions.https.onRequest(app);
