const functions = require("firebase-functions");
const app = require("express")();
const {createAuthToken} = require("./createAuthToken");
const cors = require("cors");

// Set up a whitelist and check against it:
const whitelist = ["https://electron-authentication.web.app/"];
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
