import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import Constants  from 'expo-constants'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';     
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID} from "@env"


// const firebaseConfig = {
//     apiKey: Constants.manifest2.extra.apiKey,
//     authDomain: Constants.manifest2.extra.authDomain,
//     projectId: Constants.manifest2.extra.projectId,
//     storageBucket: Constants.manifest2.extra.storageBucket,
//     messagingSenderId: Constants.manifest2.extra.messagingSenderId,
//     appId: Constants.manifest2.extra.appId,

// }

const firebaseConfig = {
  apiKey:API_KEY,
  authDomain:AUTH_DOMAIN,
  projectId:PROJECT_ID,
  storageBucket:STORAGE_BUCKET,
  messagingSenderId:MESSAGING_SENDER_ID,
  appId:APP_ID
}
const app = initializeApp(firebaseConfig)
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export const database = getFirestore()
