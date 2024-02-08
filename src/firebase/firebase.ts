import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';

import { NamesDBCollection } from '../constants/enums';

import { firebaseConfig } from './firebaseConfig';

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const gitHubProvider = new GithubAuthProvider();
export const googleProvider = new GoogleAuthProvider();
export const usersCollection = collection(db, NamesDBCollection.Users);
