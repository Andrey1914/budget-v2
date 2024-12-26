import { Document } from "mongoose";

export interface IUser extends Document {
  _id?: string;
  name: string;
  email: string;
  image: string;
  password: string;
  token?: string;
  isVerified: boolean;
  verificationCode?: string;
  currency?: string;
}

export interface UserMenuProps {
  userName: string | null;
  userImage?: string | null;
}

export interface AuthResponse {
  user: IUser;
}
