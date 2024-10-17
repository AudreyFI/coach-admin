import { USERS_LIST } from "../data/users";
import { PUBLIC_USERS_LIST } from "../mock/users.mock";
import { Subscription } from "./subscription";

export type User = {
  id: number;
  firstname: string;
  lastname?: string;
  email: string;
  subscriptions?: Subscription[];
};

export const USERS: User[] =
  import.meta.env.VITE_ENV === "local" ? USERS_LIST : PUBLIC_USERS_LIST;
