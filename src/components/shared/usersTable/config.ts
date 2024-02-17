import { UsersKeys, UserRole } from 'constants/enums';

export const headerTableNames = [
  UsersKeys.FullName,
  UsersKeys.Role,
  UsersKeys.Nickname,
  UsersKeys.Phone,
  UsersKeys.Email,
  UsersKeys.Balance,
];

export const colorBlue = '#0053fa';

export const colorRed = '#f71919';

interface IColor {
  color: string;
}

type TRole = UserRole.Admin | UserRole.User;

export const UserColor: Record<TRole, IColor> = {
  admin: { color: colorRed },
  user: { color: colorBlue },
};
