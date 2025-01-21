// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBohaiHo6iAO7P1mejAfpIpL_xx_Z09yR8",
  authDomain: "ecommerce-25bbc.firebaseapp.com",
  projectId: "ecommerce-25bbc",
  storageBucket: "ecommerce-25bbc.appspot.com",
  messagingSenderId: "1061357258303",
  appId: "1:1061357258303:web:4f88c4f0d84a9f8c8e9a8a",
  measurementId: "G-468LYVEP03"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

