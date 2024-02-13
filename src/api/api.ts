import { NamesDBCollection } from 'constants';

import { signInWithPopup, signOut } from 'firebase/auth';
import {
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
  collection,
} from 'firebase/firestore';

import { auth, db } from 'firebase';
import { ILogInUserArg, IResultUserInfoData, IUniversalObjectArguments } from 'types';

export const setFirestoreData = async <T extends {}>(
  nameCollection: string,
  { id, values }: IUniversalObjectArguments<T>,
): Promise<void> => {
  if (!id) {
    return;
  }

  await setDoc(doc(collection(db, nameCollection), id), { ...values });
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
  nameCollection: string,
  limitNumber?: number,
): Promise<QuerySnapshot> => {
  let data;

  if (limitNumber) {
    data = await getDocs(query(collection(db, nameCollection), limit(limitNumber)));

    return data;
  }

  data = await getDocs(collection(db, nameCollection));

  return data;
};

export const checkFieldValueExists = async (
  nameCollection: string,
  fieldName: string,
  value: string,
): Promise<boolean> => {
  const docsQuery = query(collection(db, nameCollection), where(fieldName, '==', value));
  const querySnapshot = await getDocs(docsQuery);

  return !querySnapshot.empty;
};

export const LogOut = async (): Promise<void> => {
  await signOut(auth);
};

export const logInUser = async ({
  provider,
}: ILogInUserArg): Promise<{
  isUser: boolean;
  resultUserInfoData: IResultUserInfoData;
}> => {
  const resultUserInfo = await signInWithPopup(auth, provider);
  const isUser = await checkFieldValueExists(
    NamesDBCollection.Users,
    'email',
    resultUserInfo.user.email!,
  );

  const resultUserInfoData = {
    email: resultUserInfo.user.email!,
    id: resultUserInfo.user.uid,
  };

  return { isUser, resultUserInfoData };
};
