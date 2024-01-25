import { signInWithPopup, signOut } from 'firebase/auth';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  QuerySnapshot,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

import { pathHome, pathSetNick } from '../constants/constants';
import { auth, db, usersCollection } from '../firebase/firebase';
import { addCurrentEmailId, setUser } from '../store/slices/mainSlice';
import { AppDispatch } from '../store/store';
import { ILogInUserArg, IUpdateUserArg, IUser } from '../types/types';

export const addUser = async (value: IUser): Promise<void> => {
  await setDoc(doc(usersCollection, value.id), value);
};

export const getUsers = async (): Promise<QuerySnapshot<DocumentData, DocumentData>> => {
  const data = await getDocs(usersCollection);

  return data;
};

export const LogOut = async (): Promise<void> => {
  await signOut(auth);
};

export const checkFieldValueExists = async (
  collectionPath: CollectionReference<DocumentData, DocumentData>,
  fieldName: string,
  value: string,
): Promise<boolean> => {
  const collectionRef = collectionPath;
  const docsQuery = query(collectionRef, where(fieldName, '==', value));
  const querySnapshot = await getDocs(docsQuery);

  return !querySnapshot.empty;
};

export const getDocCollection = async (
  dataBase: Firestore,
  nameCollection: string,
  id: string,
): Promise<DocumentData | void> => {
  const docRef = doc(dataBase, nameCollection, id);
  const docInfo = await getDoc(docRef);

  return docInfo.data();
};

export const LogInUser = async (
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
    const currentUserInfo = await getDocCollection(db, 'users', resultUserInfo.user.uid);

    dispatch(setUser(currentUserInfo as IUser));
    navigate(pathHome);
  } else {
    dispatch(addCurrentEmailId(resultUserInfo.user));
    navigate(pathSetNick);
  }
};

export const updateUser = async ({ id, values }: IUpdateUserArg): Promise<void> => {
  const userDoc = doc(db, 'users', id);

  await updateDoc(userDoc, { ...values });
};
