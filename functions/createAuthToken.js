const {initializeApp} = require("firebase-admin/app");
const {getAuth} = require("firebase-admin/auth");
const {getFirestore, doc, setDoc} = require("firebase/firestore");

initializeApp();

exports.createAuthToken = async (request, response) => {
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
};
