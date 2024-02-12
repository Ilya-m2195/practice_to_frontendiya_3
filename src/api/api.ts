import { Path, Collections } from 'constants';

import { signInWithPopup, signOut } from 'firebase/auth';
import {
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
  collection,
  orderBy,
  startAt,
  endAt,
} from 'firebase/firestore';

import { auth, db, usersCollection } from 'firebase';
import { addCurrentEmailId, setUser, AppDispatch } from 'store';
import { ILogInUserArg, IUpdateUserArg, IUser } from 'types';

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
  collectionName: Collections,
  fieldName: string,
  value: string,
): Promise<QuerySnapshot<DocumentData, DocumentData>> => {
  const collectionRef = collection(db, collectionName);
  const docsQuery = query(collectionRef, where(fieldName, '==', value));
  const querySnapshot = await getDocs(docsQuery);

  return querySnapshot;
};

export const searchData = async (
  collectionName: Collections,
  fieldName: string,
  value: string,
): Promise<QuerySnapshot<DocumentData, DocumentData>> => {
  const collectionRef = collection(db, collectionName);
  const searchTermLow = value.toLowerCase();

  const docsQuery = query(
    collectionRef,
    orderBy(fieldName),
    startAt(searchTermLow),
    endAt(`${searchTermLow}\uf8ff`),
  );

  const querySnapshot = await getDocs(docsQuery);

  return querySnapshot;
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

export const logInUser = async (
  { provider, navigate }: ILogInUserArg,
  dispatch: AppDispatch,
): Promise<void> => {
  const resultUserInfo = await signInWithPopup(auth, provider);
  const isUser = await checkFieldValueExists(
    Collections.Users,
    'email',
    resultUserInfo.user.email!,
  );

  if (!isUser.empty) {
    const currentUserInfo = await getDocCollection(db, 'users', resultUserInfo.user.uid);

    dispatch(setUser(currentUserInfo as IUser));
    navigate(Path.Home);
  } else {
    dispatch(addCurrentEmailId(resultUserInfo.user));
    navigate(Path.SetNick);
  }
};

export const updateUser = async ({ id, values }: IUpdateUserArg): Promise<void> => {
  const userDoc = doc(db, 'users', id);

  await updateDoc(userDoc, { ...values });
};
