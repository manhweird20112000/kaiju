export enum Gender {
  male = 'male',
  female = 'female',
}

export enum Status {
  active = 'active',
  inactive = 'inactive',
}

export enum TypeMedia {
  image = 'image',
  file = 'file',
  audio = 'audio',
  video = 'video',
}

export enum TypeAuth {
  facebook = 'facebook',
  google = 'google',
  normal = "normal",
}

export interface ResponseHttpType {
  data: any;
  message: string;
  statusCode: number;
}

export const CREATED = 'Created.';
export const EMAIL_ALREADY_IN_USE = 'Email already in use.';
export const ACCOUNT_NOT_EXIST = 'Account not exist.';
export const PASSWORD_FAIL = 'Password fail.';
export const SUCCESS = 'Successfully.';
export const PASSWORD_NOT_SAME = 'Passwords are not the same.';
export const NOT_FOUND = 'Not found.';
