const {initializeApp} = require("firebase-admin/app");
const {getAuth} = require("firebase-admin/auth");
const {getFirestore, doc, setDoc} = require("firebase/firestore");
const cors = require("cors")({
  origin: true,
});

initializeApp();

exports.createAuthToken = (request, response) => {
  cors(request, response, async () => {
    const db = getFirestore();
    const auth = getAuth();

    const query = request.query;
    const oneTimeCode = query["ot-auth-code"];
    const idToken = query["id-token"];

    const decodedToken = await auth.verifyIdToken(idToken);

    const uid = decodedToken.uid;

    const authToken = await auth.createCustomToken(uid);

    console.log("Authentication token", authToken);

    await setDoc(doc(db, "ot-auth-codes", oneTimeCode), authToken);

    return response.status(200).send({
      token: authToken,
    });
  });
};
