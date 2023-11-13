export interface Users {
  _id: string;
  name: string;
  email: string;
  password: string;
  is_verified: boolean;
  is_admin: boolean;
  is_blocked: boolean;
  _v: number;
}
export interface Tutors {
  _id: string;
  name: string;
  email: string;
  password: string;
  is_verified: boolean;
  is_blocked: boolean;
  is_approve: boolean;
  _v: number;
}
