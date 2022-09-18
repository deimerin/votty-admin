// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// default databaseURL
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const ballotURL = process.env.REACT_APP_FIREBASE_DATABASE_BALLOT
const verfURL = process.env.REACT_APP_FIREBASE_DATABASE_VERF
const votURL = process.env.REACT_APP_FIREBASE_DATABASE_VOT
const candURL = process.env.REACT_APP_FIREBASE_DATABASE_CAND

// Initialize Firebase
// https://firebase.google.com/docs/database/usage/sharding
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//
const ballot = initializeApp({
    databaseURL: ballotURL}, 'ballot');
  
const verf = initializeApp({
    databaseURL: verfURL}, 'verf');

const vot = initializeApp({
    databaseURL: votURL}, 'vot');

const cand = initializeApp({
    databaseURL: candURL}, 'cand');
  
export const ballotDB = getDatabase(ballot);
export const verfDB = getDatabase(verf);
export const votDB = getDatabase(vot);
export const candDB = getDatabase(cand);

const private_key = process.env.REACT_APP_FIREBASE_PRIVATE_KEY