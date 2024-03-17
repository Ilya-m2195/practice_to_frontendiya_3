import { signInWithPopup, signOut } from 'firebase/auth';
import {
  DocumentData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  collection,
  orderBy,
  limit,
  startAfter,
  startAt,
  getCountFromServer,
  QuerySnapshot,
  onSnapshot,
  DocumentReference,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

import {
  ErrorUpload,
  FieldsTransaction,
  maxSizeUploadFile,
  NamesDBCollection,
} from 'constant';
import { auth, db, storage } from 'firebase';
import {
  IDeleteDataStorage,
  ILogInUserArg,
  IResultUserInfoData,
  IReturnGetFirestoreData,
  IUniversalObjectArguments,
  IUploadDataStorage,
} from 'types';

export const setFirestoreData = async <T extends {}>(
  nameCollection: string,
  { id, values }: IUniversalObjectArguments<T>,
): Promise<void> => {
  if (!id) {
    const newDocumentRef = doc(collection(db, nameCollection));

    await setDoc(newDocumentRef, { id: newDocumentRef.id, ...values });

    return;
  }

  await setDoc(doc(collection(db, nameCollection), id), { ...values });
};

export const setFirestoreSubCollectionById = async <T extends {}>(
  nameCollection: string,
  nameSubCollection: string,
  { id, values }: IUniversalObjectArguments<T>,
): Promise<void> => {
  if (!id) {
    return;
  }

  const ref = collection(db, nameCollection, id, nameSubCollection);

  await setDoc(doc(ref), { ...values });
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

export const getFirestoreSubCollectionById = async (
  nameCollection: string,
  id: string,
  nameSubCollection: string,
  orderField: FieldsTransaction,
  limitCount: number,
  lastVisibleData: Nullable<QuerySnapshot>,
): Promise<IReturnGetFirestoreData> => {
  const snapshot = await getCountFromServer(
    collection(db, nameCollection, id, nameSubCollection),
  );
  const lengthData = snapshot.data().count;

  const data = await getDocs(
    query(
      collection(db, nameCollection, id, nameSubCollection),
      orderBy(orderField),
      startAt(lastVisibleData),
      limit(limitCount),
    ),
  );

  const lastVisible = data.docs[data.docs.length - 1];

  return { data, lastVisible, lengthData };
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
  nameField: string,
  limitNumber: number,
  valueSearchField: Nullable<string>,
  lastVisibleData: Nullable<QueryDocumentSnapshot>,
): Promise<IReturnGetFirestoreData> => {
  const snapshot = await getCountFromServer(collection(db, nameCollection));
  const lengthData = snapshot.data().count;

  if (valueSearchField) {
    const data = await getDocs(
      query(
        collection(db, nameCollection),
        orderBy(nameField),
        startAfter(lastVisibleData),
        limit(limitNumber),
        where(nameField, '==', valueSearchField),
      ),
    );

    const lastVisible = data.docs[data.docs.length - 1];

    return { data, lastVisible, lengthData };
  }

  const data = await getDocs(
    query(
      collection(db, nameCollection),
      orderBy(nameField),
      startAfter(lastVisibleData),
      limit(limitNumber),
    ),
  );

  const lastVisible = data.docs[data.docs.length - 1];

  return { data, lastVisible, lengthData };
};

export const checkFieldValueExists = async (
  nameCollection: NamesDBCollection,
  fieldName: string,
  value: string,
): Promise<boolean> => {
  const docsQuery = query(collection(db, nameCollection), where(fieldName, '==', value));
  const querySnapshot = await getDocs(docsQuery);

  return !querySnapshot.empty;
};

export const searchData = async (
  collectionName: NamesDBCollection,
  fieldName: string,
  value: string,
  searchCaseSensitive: boolean,
): Promise<Array<DocumentData>> => {
  const collectionRef = collection(db, collectionName);
  const searchTermLow = searchCaseSensitive ? value : value.toLowerCase();

  const docsQuery = query(
    collectionRef,
    where(fieldName, '>=', searchTermLow),
    where(fieldName, '<=', `${searchTermLow}\uf8ff`),
    orderBy(fieldName),
  );

  const querySnapshot = await getDocs(docsQuery);

  if (!querySnapshot || querySnapshot.empty) return [];

  const data: Array<DocumentData> = [];

  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return data;
};

export const userObserver = (id: string, callback: (data: any) => void): (() => void) => {
  const ref: DocumentReference = doc(db, NamesDBCollection.Users, id);

  const unsubscribe = onSnapshot(ref, (doc) => {
    callback(doc.data());
  });

  return unsubscribe;
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
    photoURL: resultUserInfo.user.photoURL!,
    createdAt: resultUserInfo.user.metadata.creationTime,
    fullName: resultUserInfo.user.displayName,
    phone: resultUserInfo.user.phoneNumber,
  };

  return { isUser, resultUserInfoData };
};

export const setDataStorage = async ({
  fileCollection,
  file,
}: IUploadDataStorage): Promise<string> => {
  if (file.size > maxSizeUploadFile) {
    throw Error(ErrorUpload.Size);
  }

  const imagesRef = ref(storage, `${fileCollection}/${file.name}`);

  await uploadBytesResumable(imagesRef, file);

  const imageUrl = await getDownloadURL(imagesRef);

  return imageUrl;
};

export const deleteDataStorage = async ({
  fileCollection,
  fileName,
}: IDeleteDataStorage): Promise<void> => {
  const imagesRef = ref(storage, `${fileCollection}/${fileName}`);

  const deleteTask = await deleteObject(imagesRef);

  return deleteTask;
};
