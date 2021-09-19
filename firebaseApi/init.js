import { initializeApp } from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyBMl8zmQUWfDFxqZ906vpLua1oYK24fJKk",
    authDomain: "koishop-dev.firebaseapp.com",
    projectId: "koishop-dev",
    storageBucket: "koishop-dev.appspot.com",
    messagingSenderId: "484415257007",
    appId: "1:484415257007:web:1b93693dd488f41cf0975a"
  }

export const firebaseApp = initializeApp(firebaseConfig);