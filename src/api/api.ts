import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { addDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { NavigateFunction } from 'react-router-dom';

import { pathSetNick } from '../constants/constants';
import { auth, db, usersCollection } from '../firebase/firebase';
import {
  addCurrentEmailId,
  addUsers,
  removeUser,
  setUser,
} from '../store/slices/mainSlice';
import { AppDispatch } from '../store/store';
import { IUpdateUser, IUser } from '../types/types';

export const addUser = async (value: IUser): Promise<void> => {
  await addDoc(usersCollection, value);
};

export const getUsers = async (dispatch: AppDispatch): Promise<void> => {
  const data = await getDocs(usersCollection);

  dispatch(addUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
};

export const LogOut = async (dispatch: AppDispatch): Promise<void> => {
  try {
    await signOut(auth);
    dispatch(removeUser());
  } catch (error) {
    console.log(error);
  }
};

export const LogInUser = async (
  provider: GithubAuthProvider | GoogleAuthProvider,
  users: Array<IUser>,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
): Promise<void> => {
  try {
    const result = await signInWithPopup(auth, provider);
    const currentUser: IUser | undefined = users.find(
      (el: IUser) => el.email === result.user.email,
    );

    if (currentUser !== undefined) {
      dispatch(setUser(currentUser));
    } else {
      dispatch(addCurrentEmailId(result.user));
      navigate(pathSetNick);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (id: string, value: IUpdateUser): Promise<void> => {
  const userDoc = doc(db, 'users', id);

  try {
    await updateDoc(userDoc, { ...value });
  } catch (error) {
    console.log(error);
  }
};
