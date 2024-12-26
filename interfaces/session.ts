import { IUser } from "./user";

export interface Session {
  user: IUser;
  expires: string;
}
