import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDcg7I1gQ1umuKTbLqyM12p3mjlqTRJnSM",
  authDomain: "random-data-generator-4770d.firebaseapp.com",
  projectId: "random-data-generator-4770d",
  storageBucket: "random-data-generator-4770d.appspot.com",
  messagingSenderId: "688498960",
  appId: "1:688498960:web:63fe5b3d153e4145b19d95",
  measurementId: "G-8Z0RT593TP"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });

