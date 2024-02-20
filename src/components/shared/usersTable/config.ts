import { UsersKeys, UserRole } from 'constants/enums';

export const headerTableNames = [
  UsersKeys.FullName,
  UsersKeys.Role,
  UsersKeys.Nickname,
  UsersKeys.Phone,
  UsersKeys.Email,
  UsersKeys.Balance,
];

type TRole = UserRole.Admin | UserRole.User;
type TColor = 'red' | 'blue';

export const UserColor: Record<TRole, TColor> = {
  admin: 'red',
  user: 'blue',
};
