const {initializeApp} = require("firebase-admin/app");
const {getAuth} = require("firebase-admin/auth");
const {getFirestore, doc, setDoc} = require("firebase/firestore");

initializeApp();

exports.createAuthToken = (request, response) => {
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
              setDoc(doc(db, "ot-auth-codes", oneTimeCode), authToken)
                  .then(() => {
                    return response.status(200).send({
                      token: authToken,
                    });
                  });
            });
      });
};
