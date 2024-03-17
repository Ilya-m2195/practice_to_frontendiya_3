export enum UsersKeys {
  Phone = 'phone',
  Nickname = 'nickname',
  FullName = 'fullName',
  Role = 'role',
  Email = 'email',
  Id = 'id',
  Balance = 'balance',
  SearchNickname = 'searchNickname',
}

export enum Languages {
  En = 'EN',
  Ru = 'RU',
}

export enum NamesActiveStyles {
  ActiveStyle = 'active',
  ItemStyle = 'item',
}

export enum ColorTheme {
  Dark = 'dark',
  Light = 'light',
}

export enum NamesDBCollection {
  Users = 'users',
  BalanceHistory = 'balanceHistory',
  ProductCategories = 'productCategories',
  Products = 'products',
}

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

export enum Path {
  Home = '/',
  Users = '/users',
  Login = '/login',
  SetNick = '/set-nick',
  UserEditing = '/editing/',
  Admin = '/admin',
  Profile = '/profile',
  Shop = '/shop',
}

export enum Locale {
  En = 'en-US',
  Ru = 'ru-RU',
}

export enum FileCollections {
  Images = 'images',
}

export enum ErrorUpload {
  Size = 'errorUploadSize',
}

export enum BalanceOperation {
  Accrue = 'accrue',
  WriteOff = 'writeOff',
}

export enum FieldsTransaction {
  DateOperation = 'dateOperation',
}

export enum ModalsId {
  FormModal = 'formModal',
}

export enum Response {
  Success = 'success',
  Error = 'error',
}
