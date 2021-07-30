var admin = require("firebase-admin");

const firebaseConfig = {
    "type": process.env.FIRABESE_TYPE,
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_private_key_id,
    "private_key": process.env.FIREBASE_private_key,
    "client_email": process.env.FIREBASE_client_email,
    "client_id": process.env.FIREBASE_client_id,
    "auth_uri": process.env.FIREBASE_auth_uri,
    "token_uri": process.env.FIREBASE_token_uri,
    "auth_provider_x509_cert_url": process.env.FIREBASE_auth_provider_x509_cert_url,
    "client_x509_cert_url": process.env.FIREBASE_client_x509_cert_url
}

try {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig)
  })
} catch (e) {}

export const firestore = admin.firestore()