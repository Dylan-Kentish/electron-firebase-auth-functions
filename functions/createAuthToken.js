const {initializeApp, applicationDefault} = require("firebase-admin/app");
const {getAuth} = require("firebase-admin/auth");
const {getFirestore} = require("firebase-admin/firestore");

exports.createAuthToken = (request, response) => {
  console.log("createAuthToken");
  initializeApp({
    credential: applicationDefault(),
  });

  const db = getFirestore();
  const auth = getAuth();

  const query = request.query;
  const oneTimeCode = query["ot-auth-code"];
  const idToken = query["id-token"];

  return auth.verifyIdToken(idToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;

        auth.createCustomToken(uid)
            .then((authToken) => {
              db.doc(`ot-auth-codes/${oneTimeCode}`).set({authToken})
                  .then(() => {
                    return response.status(200).send({
                      token: authToken,
                    });
                  });
            });
      });
};
