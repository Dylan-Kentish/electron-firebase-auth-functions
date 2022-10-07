# firebase-auth-functions

This repository demonstrates using the firebase-admin SDK, for authentication within firebase functions. 

This repository requires that the default Firebase Service Account has the "Service Account Token Creator".

The /customToken requires the caller to provide a firebase JWT authentication token in the header,
this token is used to identify the user and create a new custom authentication token.

The custom token returned can be used to login as the user, using the firebase/auth function "signInWithCustomToken".
