# electron-firebase-auth-functions

This repository demonstrates using the firebase-admin SDK. 

This repository requires that the default Firebase Service Account has the "Service Account Token Creator".

The /createAuthToken function takes a "id-token", this identifies a previously authenticated user.

The custom token returned can be used to login as the user, using the firebase/auth function "signInWithCustomToken".
