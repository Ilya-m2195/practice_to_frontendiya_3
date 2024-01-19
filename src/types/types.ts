// export interface ICurrentUser {
//   nickname: string;
//   id: string;
//   fullName: string;
//   email: string;
//   role: string;
//   phone:
// }

export interface IInitialState {
  isAuth: boolean;
  email: string;
  id: string;
  role: string;
  nickname: string;
  users: Array<IUser>;
}

export interface IUser {
  phone: string;
  nickname: string;
  fullName: string;
  role: string;
  email: string;
  id?: string;
  balance: number;
}

export interface IUpdateUser {
  fullName: string;
  nickname: string;
  role: string;
}
