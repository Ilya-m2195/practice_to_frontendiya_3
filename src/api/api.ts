import { signInWithPopup, signOut } from 'firebase/auth';
import {
  CollectionReference,
  DocumentData,
  QuerySnapshot,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  limit,
} from 'firebase/firestore';

import { NamesDBCollection } from '../constants/enums';

import { pathHome, pathSetNick } from 'constants/constants';
import { auth, db, usersCollection } from 'firebase/firebase';
import { addCurrentEmailId, setUser } from 'store/slices/mainSlice';
import { AppDispatch } from 'store/store';
import { ILogInUserArg, IUniversalObjectArguments, IUser } from 'types/types';

export const setFirestoreData = async <T extends {}>(
  collection: CollectionReference,
  { id, values }: IUniversalObjectArguments<T>,
): Promise<void> => {
  if (!id) {
    return;
  }

  await setDoc(doc(collection, id), { ...values });
};

export const deleteFirestoreDataById = async (
  nameCollection: string,
  id: string,
): Promise<void> => {
  await deleteDoc(doc(db, nameCollection, id));
};

export const getFirestoreDataById = async (
  nameCollection: string,
  id: string,
): Promise<DocumentData | void> => {
  const docRef = doc(db, nameCollection, id);
  const docInfo = await getDoc(docRef);

  return docInfo.data();
};

export const updateFirestoreDataById = async <T extends {}>(
  { id, values }: IUniversalObjectArguments<T>,
  nameCollection: string,
): Promise<void> => {
  if (!id) {
    return;
  }
  const userDoc = doc(db, nameCollection, id);

  await updateDoc(userDoc, values);
};

export const getFirestoreData = async (
  collection: CollectionReference,
  limitNumber?: number,
): Promise<QuerySnapshot> => {
  let data;

  if (limitNumber !== undefined && limitNumber > 0) {
    data = await getDocs(query(collection, limit(limitNumber)));

    return data;
  }

  data = await getDocs(collection);

  return data;
};

export const checkFieldValueExists = async (
  collectionPath: CollectionReference,
  fieldName: string,
  value: string,
): Promise<boolean> => {
  const docsQuery = query(collectionPath, where(fieldName, '==', value));
  const querySnapshot = await getDocs(docsQuery);

  return !querySnapshot.empty;
};

export const LogOut = async (): Promise<void> => {
  await signOut(auth);
};

export const logInUser = async (
  { provider, navigate }: ILogInUserArg,
  dispatch: AppDispatch,
): Promise<void> => {
  const resultUserInfo = await signInWithPopup(auth, provider);
  const isUser = await checkFieldValueExists(
    usersCollection,
    'email',
    resultUserInfo.user.email!,
  );

  if (isUser) {
    const currentUserInfo = await getFirestoreDataById(
      NamesDBCollection.Users,
      resultUserInfo.user.uid,
    );

    dispatch(setUser(currentUserInfo as IUser));
    navigate(pathHome);
  } else {
    dispatch(addCurrentEmailId(resultUserInfo.user));
    navigate(pathSetNick);
  }
};
