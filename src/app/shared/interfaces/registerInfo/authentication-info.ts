export interface RegisterInfoType {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}
export interface LoginInfoType {
  email: string;
  password: string;
}

export interface userDataType {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}