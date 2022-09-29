const {initializeApp} = require("firebase-admin/app");
const {getAuth} = require("firebase-admin/auth");

initializeApp();

exports.createAuthToken = (request, response) => {
  console.log("createAuthToken");

  const auth = getAuth();
  const query = request.query;
  const idToken = query["id-token"];

  return auth.verifyIdToken(idToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;

        auth.createCustomToken(uid)
            .then((authToken) => {
              return response.status(200).send({
                token: authToken,
              });
            });
      });
};
