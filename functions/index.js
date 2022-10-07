const functions = require("firebase-functions");
const app = require("express")();
const {customToken} = require("./createAuthToken");
const cors = require("cors");
const {auth}= require("./firebase");

// Set up a whitelist and check against it:
const whitelist = ["https://electron-authentication.web.app"];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Access from "${origin}" not allowed by CORS`));
    }
  },
};

const getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    req.authToken = req.headers.authorization.split(" ")[1];
  } else {
    req.authToken = null;
  }
  next();
};

const checkIfAuthenticated = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const userInfo = await auth.verifyIdToken(req.authToken);
      req.authId = userInfo.uid;
      return next();
    } catch (e) {
      return res
          .status(401)
          .send({error: "You are not authorized to make this request"});
    }
  });
};

app.use(cors(corsOptions));
app.use(checkIfAuthenticated);
app.post("/custom-token", customToken);

exports.api = functions.https.onRequest(app);
