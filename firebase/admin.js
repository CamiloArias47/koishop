var admin = require("firebase-admin");

const firebaseConfig = JSON.parse(process.env.FIRABESE_ADMIN)

console.log({firebaseConfig})
console.log(typeof firebaseConfig)

try {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig)
  })
} catch (e) {}

export const firestore = admin.firestore()